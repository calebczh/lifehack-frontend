import React, { useState } from "react";
import styles from "./MapMarker.module.css";
import { Marker, InfoWindow } from "@react-google-maps/api";

function MapMarker(props) {
  //   const clusterer = props.clusterer;
  const markerData = props.markerData;

  //   const [mapMarker, setMapMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const onMarkerClick = () => {
    setShowingInfoWindow(true);
  };

  const onInfoWindowClose = () => {
    setShowingInfoWindow(false);
  };

  //   onLoad = (mapMarker) => {
  //     setMapMarker(mapMarker);
  //   };

  return (
    <Marker
      //   clusterer={clusterer}
      //   onLoad={onLoad}
      position={{
        lat: markerData.lat,
        lng: markerData.lng,
      }}
      clickable
      onClick={onMarkerClick}
      icon={{ url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }}
    >
      {showingInfoWindow && (
        <InfoWindow position={markerData} onCloseClick={onInfoWindowClose}>
          <div>
            <p className={styles.label}>Name : </p>
            <p className={styles.label}>Current Load : </p>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
}

export default MapMarker;
