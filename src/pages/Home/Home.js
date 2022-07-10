//import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Box from "../../components/Box";
import Map from "../../components/Map/map";
import styles from "./Home.module.css";
import React, {
  useState,
  //   useEffect,
  useContext,
  // useReducer,
  // useRef,
} from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import AuthContext from "../../store/AuthContext";
import { useLoadScript } from "@react-google-maps/api";
import styled from "styled-components";

// const Wrapper = styled.main`
//   width: 100%;
//   height: 100%;
// `;

function Home() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const jsonData = require("../../store/busstop.json");

  const [markerArray, setMarkerArray] = useState([]);
  const [currPostal, setCurrPostal] = useState("");

  const [validationMessage, setValidationMessage] = useState("");

  function calculatePoints(target) {
    function distance(lat1, lat2, lon1, lon2) {
      // The math module contains a function
      // named toRadians which converts from
      // degrees to radians.
      lon1 = (lon1 * Math.PI) / 180;
      lon2 = (lon2 * Math.PI) / 180;
      lat1 = (lat1 * Math.PI) / 180;
      lat2 = (lat2 * Math.PI) / 180;

      // Haversine formula
      let dlon = lon2 - lon1;
      let dlat = lat2 - lat1;
      let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

      let c = 2 * Math.asin(Math.sqrt(a));

      // Radius of earth in kilometers. Use 3956
      // for miles
      let r = 6371;

      // calculate the result
      return c * r;
    }
    const jsonData = require("../../store/busstop.json");
    let arrayOfPoints = jsonData.value.map((data) => {
      return {
        lat: data.Latitude,
        lng: data.Longitude,
      };
    });

    arrayOfPoints = arrayOfPoints.filter((coord) => {
      return target
        ? distance(coord.lat, target.lat, coord.lng, target.lng) < 0.5
        : false;
    });

    return arrayOfPoints;
  }

  const handleSubmitPostal = () => {
    const appendedPostal = "Singapore " + currPostal;
    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${appendedPostal}&key=${key}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.results[0].address_components[0].types[0] === "postal_code") {
          const json = {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          };
          authCtx.setClosestBins(calculatePoints(json));
          setValidationMessage("");
          setMarkerArray([json]);
        } else {
          setValidationMessage("Not a valid postal code");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return !isLoaded ? (
    <div>Loading...</div>
  ) : (
    <div className={styles.right}>
      <Box>
        <Stack gap={3}>
          <h1 className={styles.header}>Welcome to LifeHack 2022!</h1>
          <p> Please enter your Postal Code here</p>
          <Form>
            <Row className="justify-content-md-center">
              <Col xs lg="1"></Col>
              <Col md="3">
                <Form.Control
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder="eg. 611622"
                  value={currPostal}
                  onChange={(e) => setCurrPostal(e.target.value)}
                />
                {validationMessage && (
                  <Form.Label className={styles.validationMessage}>
                    {" "}
                    {validationMessage}{" "}
                  </Form.Label>
                )}
              </Col>
              <Col md="1">
                <Button onClick={handleSubmitPostal}> Search</Button>
              </Col>
              <Col xs lg="1"></Col>
            </Row>
          </Form>
          {/* <Wrapper> */}

          <Row>
            <Col xs="4"></Col>
            <Col xs="4">
              <Map markerArray={markerArray} />
            </Col>
            <Col xs="4"></Col>
          </Row>

          {/* </Wrapper> */}
        </Stack>
      </Box>
    </div>
  );
}

export default Home;
