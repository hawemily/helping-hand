import React, { useState } from "react";
import {
  Container,
  Button,
  Table,
  ButtonGroup,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import DetailsModal from "../DetailsModal";
import { TiTick } from "react-icons/ti";
import { GiEmptyHourglass } from "react-icons/gi";
import axios from "axios";
import * as formatter from "../general/dateTimeFormatter";

import { IconContext } from "react-icons";

class VolunteerTaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      detailsModalShow: [],
      buttonStates: [],
    };
    this.defaultState = {
      colorButton: "danger",
      isClicked: false,
    };
  }

  // const [tasks, setTasks] = useState([]);
  // const [detailsModalShow, setDetailsModalShow] = useState(false);
  // const [buttonStates, setButtonStates] = useState(
  //   Array(tasks.length).fill(defaultState)
  // );

  taskComplete = (i) => {
    var states = this.state.buttonStates.slice(0);
    var state = { ...states[i] };
    state.isClicked = !state.isClicked;
    state.colorButton = state.isClicked ? "success" : "danger";
    states[i] = state;

    axios
      .post("/tasks/complete/" + this.state.tasks[i]._id)
      .then((res) => {
        if (res.data.success) {
          this.setState((state) => {
            return {
              buttonStates: states,
            };
          });
        }
      })
      .catch((err) => console.error(err));
  };

  showDetailsModal = (index) => {
    var show = this.state.detailsModalShow;
    show[index] = true;
    this.setState({ detailsModalShow: show });
  };

  closeDetailsModal = (index) => {
    var show = this.state.detailsModalShow;
    show[index] = false;
    this.setState({ detailsModalShow: show });
  };

  loadTasks = () => {
    axios.get("/tasks/" + localStorage.getItem("id_token")).then((res) => {
      if (res.data.success) {
        // tasks = res.data.services;
        var buttonStates = [];
        var show = [];
        var validTasks = res.data.tasks;
        validTasks.forEach((e) => {
          buttonStates.push({
            colorButton: e.status == "complete" ? "success" : "danger",
            isClicked: e.status == "complete",
          });
          show.push(false);
        });
        this.setState({
          tasks: validTasks,
          buttonStates: buttonStates,
          detailsModalShow: show,
        });
      }
    });
  };

  componentDidMount() {
    this.loadTasks();
  }

  renderTooltip = (id, clicked) => {
    return (
      <Tooltip id={"volunteerTooltip" + id}>
        {clicked ? "Complete" : "Pending"}
      </Tooltip>
    );
  };

  render() {
    return (
      <Container className='table-responsive'>
        <Table>
          <thead>
            <tr className='text-center'>
              <th>Date</th>
              <th>Area</th>
              <th>Service</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map((task, index) => {
              const { category, details, date, time, area } = task.service;
              return (
                <tr
                  className={`text-center ${
                    this.state.buttonStates[index].isClicked
                      ? "confirmed"
                      : "pending"
                  }`}
                  key={index}
                >
                  <td className='align-middle'>{formatter.formatDate(date) + ", " + formatter.formatTime(time)}</td>
                  <td className='align-middle'>{area}</td>
                  <td className='align-middle'>{`${category}`}</td>
                  <td className='align-middle'>
                    <ButtonGroup>
                      <Button
                        variant='primary'
                        onClick={() => this.showDetailsModal(index)}
                        className='mr-2'
                      >
                        More Details
                      </Button>
                      <div id={task._id}>
                        <DetailsModal
                          show={this.state.detailsModalShow[index]}
                          basket={details.basket}
                          category={category}
                          taskId={task._id}
                          pin={task.pinId}
                          onHide={() => this.closeDetailsModal(index)}
                          ariaLabelledBy={task._id}
                        />
                      </div>

                      <Button
                        variant={this.state.buttonStates[index].colorButton}
                        onClick={() => this.taskComplete(index)}
                        disabled={this.state.buttonStates[index].isClicked}
                        className='mr-2'
                      >
                        {this.state.buttonStates[index].isClicked
                          ? "Completed"
                          : "Not Completed"}
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td className='align-middle'>
                    <IconContext.Provider
                      value={{ style: { fontSize: "30px" } }}
                    >
                      <OverlayTrigger
                        placement='right'
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip(
                          index,
                          this.state.buttonStates[index].isClicked
                        )}
                      >
                        <div>
                          {this.state.buttonStates[index].isClicked ? (
                            <TiTick />
                          ) : (
                            <GiEmptyHourglass />
                          )}
                        </div>
                      </OverlayTrigger>
                    </IconContext.Provider>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default VolunteerTaskList;
