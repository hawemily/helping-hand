import React from "react";
import axios from "axios";
import VolunteerTaskCard from "./volunteers/VolunteerTaskCard";

class Volunteer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
    this.tasks = [];
  }

  componentDidMount() {
    var taskList = this.tasks;

    function loadService(task) {
      return new Promise((resolve, reject) => {
        // const { _id, pinId } = task;
        // const { date, time, category } = task.service;
        // const { store, basket, subs } = task.service.details;
        if (task.status == 'pending') {
          taskList.push(task);
        }
        resolve();
      });
    }

    axios
      .get("/tasks")
      .then(async function (e) {
        var taskList = e.data.tasks;
        const promises = taskList.map(loadService);

        await Promise.all(promises);
      })
      .then(() => {
        this.setState({
          isLoaded: true,
        });
      })
      .catch((err) => {
        this.setState({
          isLoaded: true,
          err,
        });
        console.error(err);
        alert("Could not load tasks. Please try again.");
      });
  }

  render() {
    const tasks = this.tasks.map((task, i) => (
      <VolunteerTaskCard
        task={task}
        key={i}
        auth={this.props.auth}
      ></VolunteerTaskCard>
    ));

    return (
      <div>
        <iframe
          width='100%'
          height='450'
          frameBorder='0'
          style={{ border: 0 }}
          src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAx-m-_ApTt5debB13Pr5jOn8neck3X58E
            &q=London'
          allowFullScreen
        ></iframe>
        <div style={{ margin: "2rem" }}>{tasks}</div>
      </div>
    );
  }
}

export default Volunteer;
