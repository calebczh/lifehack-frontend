//import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Box from "../../components/Box";
import styles from "./Profile.module.css";
import React, {
  //   useState,
  //   useEffect,
  useContext,
  // useReducer,
  // useRef,
} from "react";
import AuthContext from "../../store/AuthContext";

function Profile() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <div className={styles.right}>
      <Box>
        <h2 className={styles.header}>Welcome Sir!</h2>
      </Box>
    </div>
  );
}

export default Profile;
