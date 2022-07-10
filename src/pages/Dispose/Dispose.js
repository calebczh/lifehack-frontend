//import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Box from "../../components/Box";
import styles from "./Dispose.module.css";
import React, {
  useState,
  //   useEffect,
  useContext,
  // useReducer,
  // useRef,
} from "react";
import AuthContext from "../../store/AuthContext";
import QR from "../../images/do-not-scan.png";
import { Form, Stack, Row, Col, Button, Spinner } from "react-bootstrap";

function Dispose() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  const [currWeight, setCurrWeight] = useState(0);

  const handleDisposeTrash = () => {
    setIsLoading(true);
    const newPoints = Math.round(
      authCtx.accountDetails.points + currWeight / 10
    );

    const url = "https://infinite-sands-60018.herokuapp.com/user/";
    const base = {
      name: authCtx.accountDetails.name,
      points: newPoints,
    };
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(base),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage; // = 'Authentication failed!';
            console.log(JSON.stringify(data));
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            console.log(errorMessage);

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // setDataFetched(true);
        // let account = data.data.account;

        // setUserNameToken(null);
        const json = {
          name: data.name,
          points: data.points,
        };
        authCtx.setAccountDetails(json);
        localStorage.setItem("accountDetails", JSON.stringify(json));
        setCurrWeight(0);
        setIsLoading(false);
        // setAuthIsLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.right}>
      <Box>
        <h1 className={styles.header}>Dispose your recyclables here</h1>
        <img src={QR} alt="QR" />
        <Stack gap={3}>
          <Form>
            <Row className="justify-content-md-center">
              <Col xs lg="1"></Col>
              <Col md="2">
                <Form.Label className={styles.formLabels}>
                  Weight (kg)
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  type="number"
                  id="inlineFormInput"
                  placeholder="eg. 1.23"
                  value={currWeight}
                  onChange={(e) => setCurrWeight(e.target.value)}
                />
              </Col>
              <Col md="1">
                <Form.Label> Points awarded</Form.Label>
                <p className="py-2"> {currWeight / 10}</p>
              </Col>
              <Col md="1">
                <Form.Label>Current Points</Form.Label>
                <p className="py-2"> {authCtx.accountDetails.points}</p>
              </Col>
              <Col xs lg="1"></Col>
            </Row>
          </Form>

          <Row className="justify-content-md-center">
            <Col xs lg="1"></Col>

            <Col xs lg="1"></Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col xs lg="1"></Col>

            <Col md="2">
              {isLoading ? (
                <Spinner variant="primary" animation="border" role="status" />
              ) : (
                <Button
                  onClick={handleDisposeTrash}
                  disabled={authCtx.closestBins.length === 0}
                >
                  {" "}
                  Dispose Trash
                </Button>
              )}
            </Col>

            <Col xs lg="1"></Col>
          </Row>
        </Stack>
      </Box>
    </div>
  );
}

export default Dispose;
