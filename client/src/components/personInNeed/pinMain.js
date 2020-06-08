import React from "react";
import NavBar from "../general/NavBar";
import Services from "./pinServiceOptions";

import "bootstrap/dist/css/bootstrap.min.css";

const PinMain = (props) => {
  return (
    <div>
      <div className="pin-banner">
        <h1
          style={{
            textAlign: "center",
            color: "white",
            textShadow: "2px 2px #39587a",
            fontSize: "64px",
            lineHeight: "78px",
          }}
        >
          Get Help
        </h1>
        <p
          style={{
            margin: "auto",
            marginBottom: "75px",
            width: "920px",
            textAlign: "center",
            color: "white",
            textShadow: "2px 2px #39587a",
            fontSize: "32px",
            lineHeight: "39px",
          }}
        >
          Contact-free support, whenever, wherever.
        </p>
      </div>
      <h3 style={{ textAlign: "center", color: "#39587a", marginBottom: "2rem"}}>
        What do you need help with?
      </h3>
      <Services />
    </div>
  );
};

export default PinMain;
