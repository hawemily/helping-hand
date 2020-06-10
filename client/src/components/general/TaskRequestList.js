import React from "react";
import {
  Nav,
  Container,
  Card,
  Button,
  Table,
  ButtonToolbar,
} from "react-bootstrap";
import EditDetailsModal from "./EditDetailsModal";
import ReportIssueModal from "./ReportIssueModal";
import { TiTick } from "react-icons/ti";
import { GiEmptyHourglass } from "react-icons/gi";
import { FaExclamationCircle } from "react-icons/fa";
import * as formatter from "./dateTimeFormatter";

import { IconContext } from "react-icons";

const TaskRequestList = (props) => {
  // props passed into task request list should have all the information shown,
  // as well as information on the volunteer who confirmed it
  // THERE IS A BUG where modal only presents first elem of list
  // TODO: try componentwillupdateprops alternative

  const tasks = props.tasks;
  const modalStates = props.modalStates;

  const toggleModal = (modalType, index) => {
    console.log(`modaltype: ${modalType}`);
    console.log(index);

    const newStates = modalStates.map((button, id) => {
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
    props.setModalStates(newStates);
  };

  if (modalStates.length === 0) {
    return null;
  }
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
          {tasks.map((task, index) => {
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
                  <ButtonToolbar>
                    <Button
                      variant='primary'
                      onClick={() => toggleModal("view", index)}
                    >
                      More Details
                    </Button>
                    <div id={taskId}>
                      <EditDetailsModal
                        show={modalStates[index].view}
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
                      show={modalStates[index].report}
                      task={task}
                      onHide={() => toggleModal("report", index)}
                    />
                  </ButtonToolbar>
                </td>
                <td className='align-middle'>
                  <IconContext.Provider value={{ style: { fontSize: "30px" } }}>
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
