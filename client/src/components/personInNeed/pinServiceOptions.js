import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const Services = (props) => {
  const optionWidth = "302px";

  const services = ["Grocery", "Laundry", "Transport", "Healthcare"];
  return (
    <Row>
      {services.map((service) => (
        <div
          style={{ marginLeft: "5%", marginBottom: "15px", width: optionWidth }}
        >
          <Card>
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
        </div>
      ))}
    </Row>
  );
};

export default Services;
