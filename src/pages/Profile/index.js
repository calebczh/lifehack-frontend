import React, { useContext } from "react";
import Template from "../../components/Template";
import AuthContext from "../../store/AuthContext";
import Profile from "./Profile";
// import Loading from "../../components/Loading/Loading";
// import { Spinner } from "react-bootstrap";

function ProfileCard() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <Template>
      <Profile />
    </Template>
  );
}
export default ProfileCard;
