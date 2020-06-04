import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

const Services = (props) => {
  const optionWidth = "302px";

  const services = ["Grocery", "Laundry", "Transport", "Healthcare"];
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
                <Button outline color='primary' block>
                  {`${service}`}
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
