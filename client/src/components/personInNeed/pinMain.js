import React from "react";
import NavBar from "../general/NavBar";
import Services from "./pinServiceOptions";

import "bootstrap/dist/css/bootstrap.min.css";

const PinMain = (props) => {
  return (
    <div>
      <h1
        style={{
          marginTop: "75px",
          textAlign: "center",
          color: "#39587a",
          fontFamily: "Rasa",
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
          color: "#39587a",
          fontFamily: "Rasa",
          fontSize: "32px",
          lineHeight: "39px",
        }}
      >
        If you need contact-free support to get groceries, walking your pets, or
        simply help around the house, submit your requests here
      </p>
      <h3 style={{ textAlign: "center", color: "#39587a", fontFamily: "Rasa" }}>
        What do you need help with?
      </h3>
      <Services />
    </div>
  );
};

export default PinMain;
