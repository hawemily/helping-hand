import React from "react";
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import PinMain from "./personInNeed/pinMain"
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"
import Homepage from "./homepage"

const InitialOptions = (props) => {
  return (
  	
    <Row>
      <div style={{marginTop: '75px', marginLeft: '15%', width: '300px'}}>
        <Card>
          <CardBody>
          	<Button outline color="info" block tag={Link} to="/getHelp">I Need Help</Button>
          	<p style={{marginTop: '15px', textAlign: 'center'}}>Make a request through our simple form, and get connected to a volunteer in your area</p>
          </CardBody>
        </Card>
      </div>
      <div style={{marginTop: '75px', marginLeft: '3%', width: '300px'}}>
        <Card>
          <CardBody>
          	<Button outline color="info" block>I Can Help</Button>
          	<p style={{marginTop: '15px', textAlign: 'center'}}>Find volunteering opportunites in your community</p>
          </CardBody>
        </Card>
      </div>
      <div style={{marginTop: '75px', marginLeft: '3%', width: '300px'}}>
        <Card>
          <CardBody>
          	<Button outline color="info" block>Learn More</Button>
          	<p style={{marginTop: '15px', textAlign: 'center'}}>Read about our story</p>
          </CardBody>
        </Card>
      </div>
    </Row>
    
  );
};

export default InitialOptions;