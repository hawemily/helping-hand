import React from "react";
import axios from "axios";
import VolunteerTaskCard from "./volunteers/VolunteerTaskCard";

class Volunteer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
    this.tasks = [];
  }

  componentDidMount() {
    var taskList = this.tasks;

   function loadService(task) {
     return new Promise((resolve, reject) => {
      axios.get("/tasks/getService/" + task._id)
      .then((e) => {
        if (e != null) {
          const { area, store, date, time, basket, category, _id, optionOne} = e.data.service;
          taskList.push({
            task: task,
            area: area,
            store: store,
            date: date,
            time: time,
            category: category,
            basket: basket
          });
        }
        resolve();
      })
      .catch((err) => {
        console.error(err);
        resolve();
      });
     })
  }

    axios
      .get("/tasks")
      .then(async function (e) {
        const promises = e.data.map(loadService);

        await Promise.all(promises);
      })
      .then(() => {
        this.setState({
          isLoaded: true
        });
      })
      .catch((err) => {
        this.setState({
          isLoaded: true,
          err
        })
        console.error(err);
        alert("Could not load tasks. Please try again.");
      });
  }


  render() {
    const tasks = this.tasks.map((task, i) => (
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
