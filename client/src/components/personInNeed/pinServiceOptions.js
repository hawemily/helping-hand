import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Services = (props) => {
  const optionWidth = "302px";

  const services = [
    { name: "Grocery", link: "/getHelp/groceries" },
    { name: "Laundry" },
    { name: "Transport" },
    { name: "Healthcare" },
  ];
  return (
    <Container>
      <Row>
        {services.map((service) => (
          <Col sm={12} lg={3} md={6}>
            <Card
              style={{
                marginLeft: "5%",
                marginBottom: "15px",
              }}
            >
              <Card.Img
                top
                width='100%'
                src='./assets/temp.png'
                alt='Card image cap'
              />
              <Card.Body>
                <Button
                  outline
                  color='primary'
                  block
                  tag={Link}
                  href={service.link}
                >
                  {service.name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
