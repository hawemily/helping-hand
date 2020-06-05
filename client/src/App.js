import React from "react";
import NavBar from "./components/general/NavBar";
import Volunteer from "./components/Volunteer";
import GroceryForm from "./components/personInNeed/GroceryForm";
import HomePage from "./components/homepage";
import PinMain from "./components/personInNeed/pinMain";
import TaskRequestList from "./components/general/TaskRequestList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./main.scss";

function App() {
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

  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/getHelp' component={PinMain} />
          <Route exact path='/getHelp/groceries' component={GroceryForm} />
          <Route
            exact
            path='/getHelp/requestList'
            component={() => <TaskRequestList tasks={sampleTasks} />}
          />
          <Route path='/volunteer' component={Volunteer} />
        </Switch>

        {/* <VolunteerTaskCard task={sampleTasks} /> */}
      </Router>
    </div>
  );
}

export default App;
