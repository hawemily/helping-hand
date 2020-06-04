import React from "react";
import NavBar from "./general/NavBar";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Volunteer from "./Volunteer";

import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = (props) => {
  const initialOptions = [
    {
      title: "I Need Help",
      body:
        " Make a request through our simple form, and get connected to a volunteer in your area",
      link: "/getHelp",
    },
    {
      title: "I Can Help",
      body: "Find volunteering opportunites in your community",
      link: "/volunteer",
    },
    { title: "Learn More", body: " Read about our story" },
  ];

  return (
    <Container>
      <h1
        style={{
          marginTop: "125px",
          textAlign: "center",
          color: "#39587a",
          fontFamily: "Rasa",
          fontSize: "64px",
          lineHeight: "78px",
        }}
      >
        HelpingHand
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
        Lending a hand to those who need it most
      </p>
      <Row>
        {initialOptions.map((option) => (
          <Col sm={12} lg={4}>
            <Card
              className='align-baseline'
              style={{
                textAlign: "center",
                height: "175px",
              }}
            >
              <Card.Body>
                <Button
                  outline
                  color='info'
                  block
                  tag={Link}
                  href={option.link}
                >
                  {`${option.title}`}
                </Button>
                <p style={{ marginTop: "15px", textAlign: "center" }}>
                  {`${option.body}`}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
