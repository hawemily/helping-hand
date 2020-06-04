import React from "react";
import { Card, CardImg, CardBody, Button, Row, Col } from 'reactstrap';

const Services = (props) => {
  const optionWidth = '302px'

  return (
    <Row>
      <div style={{marginLeft: '5%', marginBottom: '15px', width: optionWidth}}>
        <Card>
          <CardImg top width="100%" src="./assets/temp.png" alt="Card image cap" />
          <CardBody>
          	<Button outline color="primary" block>Groceries</Button>
          </CardBody>
        </Card>
      </div>  
      <div style={{marginLeft: '2%', marginBottom: '15px', width: optionWidth}}>
        <Card>
          <CardImg top width="100%" src="../../assets/temp.png" alt="Card image cap" />
          <CardBody>
          	<Button outline color="primary" block>Laundry</Button>
          </CardBody>	
        </Card>
      </div>
      <div style={{marginLeft: '2%', marginBottom: '15px', width: optionWidth}}>
        <Card>
          <CardImg top width="100%" src="../../assets/temp.png" alt="Card image cap" />
          <CardBody>
          	<Button outline color="primary" block>Transport</Button>
          </CardBody>	
        </Card>
      </div>
      <div style={{marginLeft: '2%', marginBottom: '15px', width: optionWidth}}>
        <Card>
          <CardImg top width="100%" src="../../assets/temp.png" alt="Card image cap" />
          <CardBody>
          	<Button outline color="primary" block>Healthcare</Button>
          </CardBody>	
        </Card>
      </div>
    </Row>
  );
};

export default Services;