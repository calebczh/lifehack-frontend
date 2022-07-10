//import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Box from "../../components/Box";
import styles from "./Image.module.css";
import React, {
  //   useState,
  //   useEffect,
  useContext,
  useRef,
  useState,
  // useReducer,
  // useRef,
} from "react";
import AuthContext from "../../store/AuthContext";
import { Row, Col, Image, Card, Spinner, Button } from "react-bootstrap";
import RecyclableItems from "../../images/recyclableitems.png";

function Classify() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  const [originalImage, setOriginalImage] = useState("");
  const [processedImage, setProcessedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleUpload = (event) => {
    event.preventDefault();
    // setImage(URL.createObjectURL(inputRef.current.files[0]));
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    // console.log(formData);

    setLoading(true);

    const url = "";
    fetch(url, {
      method: "PUT",
      body: formData,
      headers: {
        // "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage;
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
        setOriginalImage(data.originalImageURL);
        setProcessedImage(data.processedImageURL);
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={styles.right}>
      <Box>
        <h1 className={styles.header}>Try It Now!</h1>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.towardszerowaste.gov.sg/recycle-right/"
        >
          Do you know that 40% of what people throw into recycling bins cannot
          be recycled
        </a>{" "}
        and{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.channelnewsasia.com/singapore/plastics-recycle-waste-singapore-environment-council-807176"
        >
          more than 4 in 10 people are unaware of what can and cannot be
          recycled
        </a>
        ?
        <div style={{ paddingTop: 30 }}>
          <Row>
            <Col>
              <h2>Original</h2>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card border="primary" style={{ width: "40rem" }}>
                  <Image
                    className="m-3"
                    src={originalImage ? originalImage : RecyclableItems}
                  />
                </Card>
              </div>
              <div style={{ paddingTop: 30 }}>
                {loading ? (
                  <div style={{ paddingLeft: 100 }}>
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <>
                    <input
                      ref={inputRef}
                      onChange={handleUpload}
                      className="d-none"
                      type="file"
                      accept="image/*"
                    />
                    <div style={{ paddingLeft: 30 }}>
                      <Button
                        onClick={() => {
                          inputRef.current?.click();
                        }}
                      >
                        Upload
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Col>
            <Col>
              <h2>Output</h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card border="danger" style={{ width: "40rem" }}>
                  <Image
                    className="m-3"
                    src={processedImage ? processedImage : RecyclableItems}
                  />
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </Box>
    </div>
  );
}

export default Classify;
