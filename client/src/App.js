import React from "react";
import NavBar from "./components/general/NavBar";
import Volunteer from "./components/Volunteer";
import GroceryForm from "./components/personInNeed/GroceryForm";
import HomePage from "./components/homepage";
import PinMain from "./components/personInNeed/pinMain";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/getHelp' component={PinMain} />
          <Route path='/volunteer' component={Volunteer} />
        </Switch>
        <GroceryForm />
      </div>
    </Router>
  );
}

export default App;
