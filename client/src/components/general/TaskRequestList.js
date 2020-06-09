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

  console.log(tasks);

  // props passed into task request list should have all the information shown,
  // as well as information on the volunteer who confirmed it
  // THERE IS A BUG where modal only presents first elem of list
  // TODO: try componentwillupdateprops alternative

  const initialArray = Array(10).fill(0);
  console.log("INITIALARRAY");
  console.log(initialArray);

  const arr = [];
  const [buttonModalShow, setButtonModalShow] = useState(
    Array(tasks.length).fill(defaultState)
  );

  console.log("TASSKSKKSKS");
  console.log(typeof tasks);
  console.log("BUTTONMODAL SHOW", typeof buttonModalShow);
  console.log(tasks[1]);
  console.log("buttonmondals");
  console.log(buttonModalShow);

  // console.log(tasks.length);
  // console.log(Array(tasks.length).fill(defaultState));
  // console.log(buttonModalShow);

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
    console.log(newStates);
    setButtonModalShow(newStates);
  };

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
          {console.log(`WHAT IS WEONG${buttonModalShow}`)}
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
};

export default TaskRequestList;
