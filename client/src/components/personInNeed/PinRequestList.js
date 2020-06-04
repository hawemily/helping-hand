import React from "react";
import axios from "axios";
import TaskRequestList from "../general/TaskRequestList";

const PinRequestList = () => {
  // should include userid
  const tasks;
  useEffect(() => {
    axios.get("/getHelp/requestList").then(
      (requests) => (tasks = requests) 
    ).catch((err) => console.log(err));
  }, []);

  return (
    <Container variant="flush">
      <TaskRequestList tasks={tasks}></TaskRequestList>
    </Container>
  );
};

export default PinRequestList;
