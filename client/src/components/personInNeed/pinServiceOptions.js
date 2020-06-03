import React from "react";
import { Card, CardImg, CardBody, Button, Row, Col } from 'reactstrap';

const Services = (props) => {
  return (
    <Row>
      <Col sm="3">
        <Card>
          <CardImg top width="100%" src="./assets/temp.png" alt="Card image cap" />
          <CardBody>
          	<Button outline color="primary" block>Groceries</Button>
          </CardBody>
        </Card>
      </Col>
      <Col sm="3">
        <Card>
          <CardImg top width="100%" src="../../assets/temp.png" alt="Card image cap" />
          <CardBody>
          	<Button outline color="primary" block>Laundry</Button>
          </CardBody>	
        </Card>
      </Col>
      <Col sm="3">
        <Card>
          <CardImg top width="100%" src="../../assets/temp.png" alt="Card image cap" />
          <CardBody>
          	<Button outline color="primary" block>Transport</Button>
          </CardBody>	
        </Card>
      </Col>
      <Col sm="3">
        <Card>
          <CardImg top width="100%" src="../../assets/temp.png" alt="Card image cap" />
          <CardBody>
          	<Button outline color="primary" block>Healthcare</Button>
          </CardBody>	
        </Card>
      </Col>
    </Row>
  );
};

export default Services;