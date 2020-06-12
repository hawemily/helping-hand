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
  // const icons = [
  //   {
  //     phone: true,
  //     header: "0700 000 0000",
  //     body: "Chat with one of us about your needs.",
  //   },
  //   {
  //     phone: false,
  //     header: "info@helpinghand.co.uk",
  //     body: "Get support or report an issue via email.",
  //   },
  // ];

  return (
      <Navbar
        sticky='bottom'
        bg='dark'
        dark
        className="footer"
        style={{
          borderTop: "1px solid #E7E7E7",
          textAlign: "center",
          height: "auto",
          width: "100%",
          color: "#F8F8F8",
          // marginTop: "30px",
        }}
      >
        <Container fluid className="footer-container">
          <Row style={{width: "100%", margin: "auto"}}>
            <Col sm={12} md={6} lg={6} className="footer-col">
              <div className="contact-section">
                <h5>Get support or report an issue via email:</h5>

                <IconContext.Provider value={{ style: { fontSize: "2rem" } }}>
                  <span style={{float: "left", marginLeft: "1.2rem"}}><FaEnvelope /></span>
                </IconContext.Provider>

                <p className="email-link">
                    <a href="mailto:info@helpinghand.co.uk">info@helpinghand.co.uk</a>
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={6} className="footer-col">
              <div className="copyright-section">
                <p>© 2020 Helping Hand. All Rights Reserved.</p>
              </div>
            </Col>
          </Row>  
        </Container>
      </Navbar>
  );
};

export default ContactUsBar;
