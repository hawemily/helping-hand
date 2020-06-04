import React from "react";
import NavBar from "./general/NavBar";
import InitialOptions from "./initialOptions";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"
import PinMain from "./personInNeed/pinMain"

import "bootstrap/dist/css/bootstrap.min.css";

const Homepage = (props) => {
  return (
  	<Router>
    <div>
      <Route exact path="/" render={(props) => ( 
      	<React.Fragment>
      	<NavBar />
      	<h1 style={{marginTop: '125px', textAlign: 'center', color: '#39587a', fontFamily: 'Rasa', fontSize: '64px', lineHeight: '78px'}}>HelpingHand</h1>
        <p style={{margin: 'auto', marginBottom: '75px', width: '920px', textAlign: 'center', color: '#39587a', fontFamily: 'Rasa', fontSize: '32px', lineHeight: '39px'}}>Lending a hand to those who need it most</p>
        <InitialOptions />
        </React.Fragment>
      	)}/>
      <Route exact path="/getHelp" component={PinMain} />
    </div>
    </Router>
  );
};

export default Homepage;

