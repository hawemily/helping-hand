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
    rate: false,
  };

  const compareDates = (itemX, itemY) => {
    const x = new Date(itemX.date);
    const y = new Date(itemY.date);
    return y - x;
  };

  useEffect(() => {
    console.log("doing backend data call");
    const id = localStorage.getItem("id_token") || "5678";
    axios
      .get("/services/allRequests/" + id)
      .then((requests) => {
        console.log(requests);
        requests.data.map((d) => console.log(d.date));
        requests.data.sort((x, y) => compareDates(x, y));
        console.log("#############");
        requests.data.map((d) => console.log(d.date));
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
