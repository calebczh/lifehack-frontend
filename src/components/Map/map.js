import React, { useContext } from "react"; //   useRef, //   // useReducer, //   useEffect, //   useState,

import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import MapMarker from "./MapMarker";
import AuthContext from "../../store/AuthContext";

function Map(props) {
  const authCtx = useContext(AuthContext);
  const defaultCentre = { lat: 1.356126, lng: 103.812442 };
  const target = props.markerArray[0];

  // const jsonData = require("../../store/busstop.json");
  // // const arrayOfPoints = props.markerArray;

  // let arrayOfPoints = jsonData.value.map((data) => {
  //   return {
  //     lat: data.Latitude,
  //     lng: data.Longitude,
  //   };
  // });

  // arrayOfPoints = arrayOfPoints.filter((coord) => {
  //   return target
  //     ? distance(coord.lat, target.lat, coord.lng, target.lng) < 0.5
  //     : false;
  // });

  return (
    <GoogleMap
      zoom={target ? 16 : 11}
      center={target ? target : defaultCentre}
      mapContainerClassName="map-container"
    >
      {target && (
        <Circle
          center={target}
          radius={500}
          options={{ fillColor: "#2a5777", strokeOpacity: 0 }}
        />
      )}
      {target &&
        authCtx.closestBins.map((point) => {
          return <MapMarker markerData={point} />;
        })}
    </GoogleMap>
  );
}

export default Map;
