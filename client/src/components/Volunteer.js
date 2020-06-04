import React from "react";
import axios from "axios";
import VolunteerTaskCard from "./volunteers/VolunteerTaskCard";

class Volunteer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tasks: []
    };
  }

  componentDidMount() {
    axios
      .get("/tasks")
      .then((e) => {
        this.setState({
          isLoaded: true,
          tasks: e.data
        });
      })
      .catch((err) => {
        this.setState({
          isLoaded: true,
          err
        })
        console.log(err);
        alert("Could not load tasks. Please try again.");
      });
  }

  render() {
    const tasks = this.state.tasks.map((task, i) => (
      <VolunteerTaskCard task={task} key={i}>
      </VolunteerTaskCard>
    ));

    return (
      <div>
        {tasks}
      </div>
    );
  }

  
};

export default Volunteer;
