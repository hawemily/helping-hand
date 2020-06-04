import React, { useState, useEffect } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import NavBar from "./general/NavBar";
import VolunteerTaskCard from "./volunteers/VolunteerTaskCard";

const Volunteer = (props) => {
  const tasks = [];

  for (var i = 0; i < 4; i++) {
    tasks.push({
      id: i,
      area: "South Kensington",
      distance: "2.2",
      date: "27/5/2020",
      category: "Groceries",
      description: "Bananas x5`{\n}`Milk (Semi-skimmed) 150ml\nOrange Juice 500ml",
      expand: () => console.log("click to expand"),
    });
  }

  return (
    <div>
      {tasks.map((task, i) => (
        <VolunteerTaskCard task={task}>
        </VolunteerTaskCard>
      ))}
    </div>
  );

  
};

export default Volunteer;
