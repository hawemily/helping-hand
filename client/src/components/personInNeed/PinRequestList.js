import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskRequestList from "../general/TaskRequestList";
import { Container } from "react-bootstrap";

const PinRequestList = () => {
  // should include userid
  const [tasks, setTasks] = useState([]);
  const [modalStates, setModalStates] = useState([]);

  const defaultState = {
    view: false,
    report: false,
  };

  useEffect(() => {
    console.log("doing backend data call");
    axios
      .get("/services/allRequests")
      .then((requests) => {
        setTasks((tasks) => tasks.concat(requests.data));
        setModalStates(Array(requests.data.length).fill(defaultState));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container variant='flush'>
      <TaskRequestList
        tasks={tasks}
        modalStates={modalStates}
        setModalStates={setModalStates}
      ></TaskRequestList>
    </Container>
  );
};

export default PinRequestList;
