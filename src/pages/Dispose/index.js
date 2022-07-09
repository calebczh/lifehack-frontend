import React, { useContext } from "react";
import Template from "../../components/Template";
import AuthContext from "../../store/AuthContext";
import Dispose from "./Dispose";
// import Loading from "../../components/Loading/Loading";
// import { Spinner } from "react-bootstrap";

function DisposeCard() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <Template>
      <Dispose />
    </Template>
  );
}
export default DisposeCard;
