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
      link: "/services",
    },
    {
      title: "I Can Help",
      body: "Find volunteering opportunites in your community",
      link: "/volunteer",
    },
    { title: "Learn More", body: " Read about our story", link: "/" },
  ];

  return (
    <Container>
      <Container
        fluid
        // style={{ textAlign: "centre", color: "#39587a" }}
        className='banner text-centre'
      >
        <h1 className='header'>HelpingHand</h1>
        <p className='body'>Lending a hand to those who need it most</p>
      </Container>

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
