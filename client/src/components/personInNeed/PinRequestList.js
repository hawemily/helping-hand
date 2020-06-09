import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskRequestList from "../general/TaskRequestList";
import { Container } from "react-bootstrap";

const PinRequestList = () => {
  // should include userid
  const [tasks, setTasks] = useState([]);

  // call async functions separately
  useEffect(() => {
    console.log("doing backend data call");
    axios
      .get("/services/allRequests")
      .then((requests) => {
        console.log("doing backend call for all requests");
        console.log(requests.data);
        setTasks(requests.data);
      })
      .catch((err) => console.log(`ERRORRRR: ${err}`));
  }, []);

  return (
    <Container variant='flush'>
      <TaskRequestList tasks={tasks}></TaskRequestList>
    </Container>
  );
};

export default PinRequestList;
