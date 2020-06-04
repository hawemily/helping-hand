import React from "react";
import { Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const InitialOptions = (props) => {
  return (
    <Row>
      <div style={{ marginTop: "75px", marginLeft: "15%", width: "300px" }}>
        <Card>
          <Card.Body>
            <Button outline color='info' block tag={Link} to='/getHelp'>
              I Need Help
            </Button>
            <p style={{ marginTop: "15px", textAlign: "center" }}>
              Make a request through our simple form, and get connected to a
              volunteer in your area
            </p>
          </Card.Body>
        </Card>
      </div>
      <div style={{ marginTop: "75px", marginLeft: "3%", width: "300px" }}>
        <Card>
          <Card.Body>
            <Button outline color='info' block tag={Link} to='/volunteer'>
              I Can Help
            </Button>
            <p style={{ marginTop: "15px", textAlign: "center" }}>
              Find volunteering opportunites in your community
            </p>
          </Card.Body>
        </Card>
      </div>
      <div style={{ marginTop: "75px", marginLeft: "3%", width: "300px" }}>
        <Card>
          <Card.Body>
            <Button outline color='info' block>
              Learn More
            </Button>
            <p style={{ marginTop: "15px", textAlign: "center" }}>
              Read about our story
            </p>
          </Card.Body>
        </Card>
      </div>
    </Row>
  );
};

export default InitialOptions;
