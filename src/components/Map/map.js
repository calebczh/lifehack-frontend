import React from "react"; //   useRef, //   // useReducer, //   useEffect, //   useState,

import { GoogleMap, Marker } from "@react-google-maps/api";

function Map(props) {
  //   const center = { lat: 44, lng: -88 };
  //   const jsonData = require("../../store/busstop.json");
  const arrayOfPoints = props.markerArray;

  //   const arrayOfPoints = jsonData.value.map((data) => {
  //     return {
  //       lat: data.Latitude,
  //       lng: data.Longitude,
  //     };
  //   });

  //   const arrayOfPoints = [
  //     {
  //       lat: 1.365393,
  //       lng: 103.805404,
  //     },
  //   ];

  return (
    <GoogleMap
      zoom={11}
      center={{ lat: 1.365393, lng: 103.805404 }}
      mapContainerClassName="map-container"
    >
      {arrayOfPoints.map((point) => {
        return <Marker position={point} />;
      })}
    </GoogleMap>
  );
}

export default Map;
