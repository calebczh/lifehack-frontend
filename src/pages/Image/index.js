import React, { useContext } from "react";
import Template from "../../components/Template";
import AuthContext from "../../store/AuthContext";
import Image from "./Image";
// import Loading from "../../components/Loading/Loading";
// import { Spinner } from "react-bootstrap";

function ImageCard() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <Template>
      <Image />
    </Template>
  );
}
export default ImageCard;
