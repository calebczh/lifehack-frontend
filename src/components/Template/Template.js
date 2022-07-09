import React from "react";
import Navigator from "../navbar/Navigator";

function Template(props) {
  const { children } = props;

  return (
    <React.Fragment style={{ overflow: "auto" }}>
      <Navigator />
      {/* <div style={{ display: "flex", minHeight: "100%", overflow: "auto" }}> */}
      {children}
      {/* </div> */}
    </React.Fragment>
  );
}

export default Template;
