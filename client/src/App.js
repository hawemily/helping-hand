import React from "react";
import NavBar from "./components/general/NavBar";
import Volunteer from "./components/Volunteer";
import GroceryForm from "./components/people_in_need/GroceryForm";
import Homepage from "./components/homepage";
import TaskRequestList from "./components/general/TaskRequestList";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Volunteer />
      <TaskRequestList />
      <GroceryForm />
      <Homepage />
    </div>
  );
}

export default App;
