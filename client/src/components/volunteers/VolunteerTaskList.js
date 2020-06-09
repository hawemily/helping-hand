import React, { useState } from "react";
import { Container, Button, Table, Row, Col } from "react-bootstrap";
import DetailsModal from "../DetailsModal";
import { TiTick } from "react-icons/ti";
import { GiEmptyHourglass } from "react-icons/gi";
import axios from 'axios';

import { IconContext } from "react-icons";

class VolunteerTaskList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      detailsModalShow: [],
      buttonStates: []
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

  loadTasks = () => {
    axios.get("/tasks/" + localStorage.getItem("id_token"))
    .then((res) => {
      if (res.data.success) {
        // tasks = res.data.services;
        var buttonStates = [];
        var show = [];
        res.data.services.forEach((e) => {
          buttonStates.push(this.defaultState);
          show.push(false);
        });
        this.setState({
          tasks: res.data.services,
          buttonStates: buttonStates,
          detailsModalShow: show
        });
        console.log(this.state);
      }
    })
  }

  toggleTask = (i) => {
    var states = this.state.buttonStates.slice(0);
    var state = {...states[i]};
    state.isClicked = !state.isClicked;
    state.colorButton = state.isClicked ? "success" : "danger";
    states[i] = state;

    // update db

    this.setState((state) => {
      return {
        buttonStates: states
      }
    })
  };

  showDetailsModal = (index) => {
    var show = this.state.detailsModalShow;
    show[index] = true;
    this.setState({detailsModalShow: show});
  }

  closeDetailsModal = (index) => {
    var show = this.state.detailsModalShow;
    show[index] = false;
    this.setState({detailsModalShow: show});
  }

  componentDidMount() {
    this.loadTasks();
  }

  render() {
    return (
      <Container variant='flush'>
        <Table>
          <thead>
            <tr className='text-center'>
              <th>Date</th>
              <th>Request No.</th>
              <th>Service</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.tasks.map((task, index) => {
              const { time, category, area, basket, date, optionOne, store, taskId } = task.service;
              return (
                <tr
                  className={`text-center ${
                    this.state.buttonStates[index].isClicked ? "confirmed" : "pending"
                  }`}
                  key={index}
                >
                  <td className='align-middle'>{date}</td>
                  <td className='align-middle'>#{taskId}</td>
                  <td className='align-middle'>{`${category}`}</td>
                  <td className='align-middle'>
                    <Row>
                      <Col>
                        <Button
                          variant='primary'
                          onClick={() => this.showDetailsModal(index)}
                        >
                          More Details
                        </Button>
                        <div id={taskId}>
                          <DetailsModal
                            show={this.state.detailsModalShow[index]}
                            task={task}
                            onHide={() => this.closeDetailsModal(index)}
                            ariaLabelledBy={task.id}
                          />
                        </div>
                      </Col>

                      <Col>
                        <Button
                          variant={this.state.buttonStates[index].colorButton}
                          onClick={() => this.toggleTask(index)}
                          // disabled={buttonStates[index].isClicked}
                        >
                          {this.state.buttonStates[index].isClicked ? "Completed" : "Not Completed"}
                        </Button>
                      </Col>
                    </Row>
                  </td>
                  <td className='align-middle'>
                    <IconContext.Provider value={{ style: { fontSize: "30px" } }}>
                      <div>
                        {this.state.buttonStates[index].isClicked ? (
                          <TiTick />
                        ) : (
                          <GiEmptyHourglass />
                        )}
                      </div>
                    </IconContext.Provider>
                  </td>
                </tr>
              );
            })
            }
          </tbody>
        </Table>
      </Container>
    );
  }
};

export default VolunteerTaskList;
