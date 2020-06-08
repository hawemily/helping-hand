
import React from 'react';
import Auth from './auth';
import NavBar from "./components/general/NavBar";
import Volunteer from "./components/Volunteer";
import GroceryForm from "./components/personInNeed/GroceryForm";
import HomePage from "./components/homepage";
import PinMain from "./components/personInNeed/pinMain";
import TaskRequestList from "./components/general/TaskRequestList";
import VolunteerTaskList from "./components/volunteers/VolunteerTaskList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const auth = new Auth();

var sampleTask = {
  isCompleted: false,
  id: "2284",
  area: "South Kensington",
  distance: "2.2",
  date: "27/5/2020",
  category: "Groceries",
  description: "Bananas x5\nMilk (Semi-skimmed) 150ml\nOrange Juice 500ml",
  expand: () => console.log("click to expand"),
};

var sampleTask2 = {
  isCompleted: false,
  id: "2234",
  area: "South Kensington",
  distance: "2.2",
  date: "18/5/2020",
  category: "Laundry",
  volunteerId: "Lisa",
  description: "Bananas x5\nMilk (Semi-skimmed) 150ml\nOrange Juice 500ml",
  expand: () => console.log("click to expand"),
};

var sampleTask3 = {
  isCompleted: true,
  id: "2213",
  area: "South Kensington",
  distance: "2.2",
  date: "16/5/2020",
  category: "Groceries",
  volunteerId: "Abby",
  description: "Bananas x5\nMilk (Semi-skimmed) 150ml\nOrange Juice 500ml",
  expand: () => console.log("click to expand"),
};

const sampleTasks = [sampleTask, sampleTask2, sampleTask3];

const Routes = () => (
  <Router>
  <NavBar auth={auth} />
  <Switch>
    <Route exact path='/' component={auth.isAuthenticated() ? (auth.isPin() ? PinMain : Volunteer) : HomePage} />
    <Route exact path='/getHelp' component={PinMain} />
    <Route exact path='/getHelp/groceries' component={GroceryForm} />
    <Route
      exact
      path='/getHelp/requestList'
      component={() => <TaskRequestList tasks={sampleTasks} />}
    />
    <Route exact path='/volunteer' component={Volunteer} />
    <Route
      exact
      path='/volunteer/taskList'
      component={() => <VolunteerTaskList tasks={sampleTasks} />}
    />
  </Switch>

  {/* <VolunteerTaskCard task={sampleTasks} /> */}
</Router>
);

export default Routes;