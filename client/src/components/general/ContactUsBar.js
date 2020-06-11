import React from "react";
import {
  Navbar,
  Table,
  Container,
  ButtonToolbar,
  Button,
} from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaExclamationCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ContactUsBar = (props) => {
  const icons = [
    {
      phone: true,
      header: "0700 000 0000",
      body: "Chat with one of us about your needs.",
    },
    {
      phone: false,
      header: "info@helpinghand.co.uk",
      body: "Get support or report an issue via email.",
    },
  ];

  return (
    <div>
      <Navbar
        sticky='bottom'
        bg='dark'
        dark
        style={{
          borderTop: "1px solid #E7E7E7",
          textAlign: "center",
          height: "auto",
          width: "100%",
          color: "#F8F8F8",
          marginTop: "30px",
        }}
      >
        <Container
          //   fluid
          style={{
            paddingTop: "10px",
          }}
        >
          <Navbar.Brand></Navbar.Brand>
          <Row className='align-items-center'>
            <Col sm={12} md={4} lg={3} className='align-middle text-align'>
              <h3> Contact Us </h3>
            </Col>
            {icons.map((icon) => (
              <Col sm={12} md={4} lg={3}>
                <span className='align-middle'>
                  <IconContext.Provider value={{ style: { fontSize: "45px" } }}>
                    <span>{icon.phone ? <FaPhoneAlt /> : <FaEnvelope />}</span>
                  </IconContext.Provider>

                  <span
                    className='align-middle'
                    style={{
                      paddingLeft: "10px",
                    }}
                  >
                    <p
                      style={{
                        margin: "10px",
                      }}
                    >
                      <p
                        style={{
                          margin: "-5px",
                        }}
                      >
                        <h5>{icon.header}</h5>
                      </p>
                      <p
                        style={{
                          margin: "-5px",
                        }}
                      >
                        <h6>{icon.body}</h6>
                      </p>
                    </p>
                  </span>
                </span>
              </Col>
            ))}
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};

export default ContactUsBar;
