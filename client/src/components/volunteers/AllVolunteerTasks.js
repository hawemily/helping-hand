import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import VolunteerTaskList from "./VolunteerTaskList";

const AllVolunteerTasks = (props) => {
  const [tasks, setTasks] = useState([]);
  useEffect(async () => {
    const {
      match: { params },
    } = props;
    axios
      .get(`/tasks/${params.vID}`)
      .then((services) => setTasks(services.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <VolunteerTaskList tasks={tasks} />
    </Container>
  );
};

export default AllVolunteerTasks;
