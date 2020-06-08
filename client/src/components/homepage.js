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
      style: "mainBtn",
    },
    {
      title: "I Can Help",
      body: "Find volunteering opportunites in your community",
      link: "/volunteer",
      style: "mainBtn",

    },
    { title: "Learn More", style: "unimportantBtn", body: " Read about our story", link: "/" },
  ];

  return (
    <div>
      <div className="home-banner">
          <h1
            style={{
              textAlign: "center",
              color: "white",
              textShadow: "2px 2px #39587a",
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
              color: "white",
              textShadow: "2px 2px #39587a",
              fontFamily: "Rasa",
              fontSize: "32px",
              lineHeight: "39px",
            }}
          >
            Lending a hand to those who need it most
          </p>
        </div>
      <Container>
        <Row>
          {initialOptions.map((option) => (
            <Col sm={12} lg={4}>
              <Card
                className='align-baseline'
                style={{
                  textAlign: "center",
                  height: "200px",
                }}
              >
                <Card.Body>
                  <Button
                    outline
                    color='info'
                    block
                    tag={Link}
                    href={option.link}
                    className={option.style}
                  >
                    {`${option.title}`}
                  </Button>
                  <p style={{ marginTop: "15px", textAlign: "center", fontSize: "1.3rem" }}>
                    {`${option.body}`}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
