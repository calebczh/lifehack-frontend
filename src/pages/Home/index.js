import React, { useContext } from "react";
import Template from "../../components/Template";
import AuthContext from "../../store/AuthContext";
import Home from "./Home";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import Loading from "../../components/Loading/Loading";
// import { Spinner } from "react-bootstrap";

function HomeCard() {
  // const render = (status = Status) => {
  //   return <h1>{status}</h1>;
  // };

  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <Template>
      {/* <Wrapper
        apiKey={"AIzaSyDC8MAkSDYyqvMW23Ad0vigVCItczmgQno"}
        render={render}
      > */}
      <Home />
      {/* </Wrapper> */}
    </Template>
  );
}
export default HomeCard;
