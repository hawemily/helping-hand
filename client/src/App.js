import React from "react";
import NavBar from "./components/general/NavBar";
import Volunteer from "./components/Volunteer";
import GroceryForm from "./components/personInNeed/GroceryForm";
import HomePage from "./components/homepage";
import PinMain from "./components/personInNeed/pinMain";
import VolunteerTaskCard from "./components/volunteers/VolunteerTaskCard";
import TaskRequestList from "./components/general/TaskRequestList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./main.scss";

function App() {
  var sampleTask = {
    id: "2284",
    area: "South Kensington",
    distance: "2.2",
    date: "27/5/2020",
    category: "Groceries",
    description: "Bananas x5\nMilk (Semi-skimmed) 150ml\nOrange Juice 500ml",
    expand: () => console.log("click to expand"),
  };

  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/getHelp' component={PinMain} />
          <Route exact path='/getHelp/groceries' component={GroceryForm} />
          <Route path='/volunteer' component={Volunteer} />
        </Switch>
        <TaskRequestList task={sampleTask} />
        <VolunteerTaskCard task={sampleTask} />
      </Router>
    </div>
  );
}

export default App;
