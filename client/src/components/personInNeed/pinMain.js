import React from "react";
import Services from "./pinServiceOptions";
import { Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const PinMain = (props) => {
  return (
    <Container>
      <h1 className='header'>Get Help</h1>
      <p className='body'>
        If you need contact-free support to get groceries, walking your pets, or
        simply help around the house, submit your requests here.
      </p>
      <h4 className='banner'>What do you need help with?</h4>
      <Services />
    </Container>
  );
};

export default PinMain;
