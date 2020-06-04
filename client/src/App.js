import React from "react";
import NavBar from "./components/general/NavBar";
import Volunteer from "./components/Volunteer";
import GroceryForm from "./components/people_in_need/GroceryForm";
import Homepage from "./components/homepage";
import VolunteerTaskCard from "./components/volunteers/VolunteerTaskCard";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./main.scss";

function App() {

  var sampleTask = {
    area: 'South Kensington',
    distance: '2.2',
    date: '27/5/2020',
    category: 'Groceries',
    description: 'Bananas x5\nMilk (Semi-skimmed) 150ml\nOrange Juice 500ml',
    expand: () => console.log('click to expand')
  }

  return (
    <div className='App'>
      <NavBar />
      <Volunteer />
      <GroceryForm />
      <Homepage />
      <VolunteerTaskCard task={sampleTask}/>
    </div>
  );
}

export default App;
