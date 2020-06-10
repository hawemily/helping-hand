import React, { useState } from "react";
import {
  Nav,
  Container,
  Card,
  Button,
  Table,
  ButtonGroup,
} from "react-bootstrap";
import TaskItem from "./TaskItem";
import ViewDetailsModal from "./ViewDetailsModal";
import ReportIssueModal from "./ReportIssueModal";
import { TiTick } from "react-icons/ti";
import { GiEmptyHourglass } from "react-icons/gi";
import { FaExclamationCircle, FaHourglass } from "react-icons/fa";
import * as formatter from "./dateTimeFormatter";

import { IconContext } from "react-icons";

const defaultState = {
  view: false,
  report: false,
};

const TaskRequestList = (props) => {
  // const tasks = props.tasks;
  const tasks = props.tasks;

  console.log("PROPS")
  console.log(tasks);

  const arr = [];
  // Initialise buttonModalShow
  const [buttonModalShow, setButtonModalShow] = useState(
    Array(tasks.length).fill(defaultState)
  );

  console.log("tasks length:" + tasks.length)
  console.log("buttonmodalshow length:" + buttonModalShow.length)
  if (tasks.length != buttonModalShow.length) {
    // update buttonModalShow when tasks updates (backend finishes fetching)
    console.log("update button modal show!")
    setButtonModalShow(Array(tasks.length).fill(defaultState))
  }
  console.log("button modals");
  console.log(buttonModalShow);

  const toggleModal = (modalType, index) => {
    console.log(`modaltype: ${modalType}`);
    console.log(index);

    const newStates = buttonModalShow.map((button, id) => {
      if (id === index) {
        const updatedState = {
          ...button,
          [modalType]: !button[modalType],
        };
        return updatedState;
      }
      return button;
    });
    console.log("new states")
    console.log(newStates);
    setButtonModalShow(newStates);
    // buttonModalShow = newStates
  };
  // Do not render until buttonModalShow is updated to match tasks, otherwise will throw error
  if (tasks.length == buttonModalShow.length)
    return (
      <Container variant='flush'>
        <Table>
          <thead>
            <tr className='text-center'>
              <th>Date</th>
              <th>Request No.</th>
              <th>Service</th>
              <th> Actions </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length !== 0 &&
              tasks.map((task, index) => {
                const {
                  date,
                  time,
                  taskId,
                  category,
                  volunteerId,
                  description,
                } = task;
                return (
                  <tr
                    className={`text-center ${
                      task.isCompleted
                        ? "completed"
                        : task.volunteerId == null
                        ? "pending"
                        : "confirmed"
                    }`}
                    key={taskId}
                  >
                    <td className='align-middle'>
                      {formatter.formatDate(date)}
                      {formatter.formatTime(time)}
                    </td>
                    <td className='align-middle'>#{taskId}</td>
                    <td className='align-middle'>{`${category}`}</td>
                    <td className='align-middle'>
                      <ButtonGroup>
                        <Button
                          variant='primary'
                          onClick={() => toggleModal("view", index)}
                        >
                          More Details
                        </Button>
                        <div id={taskId}>
                          <ViewDetailsModal
                            show={buttonModalShow[index].view}
                            task={task}
                            onHide={() => toggleModal("view", index)}
                            ariaLabelledBy={task.taskId}
                          />
                        </div>
                        <Button
                          variant='danger'
                          onClick={() => toggleModal("report", index)}
                        >
                          Report Issue
                        </Button>
                        <ReportIssueModal
                          show={buttonModalShow[index].report}
                          task={task}
                          onHide={() => toggleModal("report", index)}
                        />
                      </ButtonGroup>
                    </td>
                    <td className='align-middle'>
                      <IconContext.Provider
                        value={{ style: { fontSize: "30px" } }}
                      >
                        <div>
                          {task.isCompleted ? (
                            <TiTick />
                          ) : task.volunteerId == null ? (
                            <FaExclamationCircle />
                          ) : (
                            <GiEmptyHourglass />
                          )}
                        </div>
                      </IconContext.Provider>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    );
  else return <Container/>
};

export default TaskRequestList;
