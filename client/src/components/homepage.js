import React from "react";
import NavBar from "./general/NavBar";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const HomePage = (props) => {
  var history = useHistory();

  const initialOptions = [
    {
      title: "I Need Help",
      body:
        " Make a request through our simple form, and get connected to a volunteer in your area",
      link: "/service",
      style: "mainBtn",
    },
    {
      title: "I Can Help",
      body: "Find volunteering opportunites in your community",
      link: "/volunteer",
      style: "mainBtn",
    },
    {
      title: "Learn More",
      style: "unimportantBtn",
      body: " Read about our story",
      link: "/",
    },
  ];

  if (props.auth.isAuthenticated()) {
    if (props.auth.isPin()) {
      history.push("/service");
    } else {
      history.push("/volunteer");
    }
  }


  return (
    <div>
      <div className='banner-bg'>
        <h1 className='header'>HelpingHand</h1>
        <p className='body'>Lending a hand to those who need it most</p>
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
                  <p
                    style={{
                      marginTop: "15px",
                      textAlign: "center",
                      fontSize: "1.3rem",
                    }}
                  >
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
