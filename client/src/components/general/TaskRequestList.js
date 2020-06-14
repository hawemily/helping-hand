import React from "react";
import {
  Nav,
  Container,
  Card,
  Button,
  Table,
  ButtonToolbar,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import EditDetailsModal from "./EditDetailsModal";
import ReportIssueModal from "./ReportIssueModal";
import StarRatingModal from "./StarRatingModal";
import { TiTick } from "react-icons/ti";
import { GiEmptyHourglass } from "react-icons/gi";
import { FaExclamationCircle } from "react-icons/fa";
import * as formatter from "./dateTimeFormatter";

import { IconContext } from "react-icons";

const TaskRequestList = (props) => {
  // props passed into task request list should have all the information shown,
  // as well as information on the volunteer who confirmed it

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

  const renderTooltip = (id, status, volunteerId) => {
    return (
      <Tooltip id={"pinTooltip" + id}>
        {status == "complete"
          ? "Complete"
          : volunteerId == null
          ? "Pending Confirmation"
          : "Request Accepted"}
      </Tooltip>
    );
  };

  const generateService = (task) => {
    if (task.category == 'Grocery') {
      return "Groceries from " + task.store;
    } else if (task.category == 'Laundry') {
      return "Laundry (" + task.load + (task.load == 1 ? " load)" : " loads)");
    }
  }

  if (modalStates.length === 0) {
    return (
      <Container className='table-responsive'>
        <Table>
          <thead>
            <tr className='text-center'>
              <th>Date</th>
              <th>Service</th>
              <th> Actions </th>
              <th>Status</th>
            </tr>
          </thead>
        </Table>
      </Container>
    );
  }
  return (
    <Container className='table-responsive'>
      <Table>
        <thead>
          <tr className='text-center'>
            <th>Date</th>
            <th>Service</th>
            <th> Actions </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            const { date, time, taskId, category } = task;

            return (
              <tr
                className={`text-center ${
                  task.status == "complete"
                    ? "completed"
                    : task.volunteerId == null
                    ? "pending"
                    : "confirmed"
                }`}
                key={taskId}
              >
                <td className='align-middle'>
                  {formatter.formatDate(date) + ", " + formatter.formatTime(time)}
                </td>
                <td className='align-middle'>{generateService(task)}</td>
                <td className='align-middle'>
                  <ButtonToolbar style={{ margin: "auto", display: "block" }}>
                    <Button
                      variant='primary'
                      onClick={() => toggleModal("view", index)}
                      className='mr-2'
                    >
                      More Details
                    </Button>

                    <EditDetailsModal
                      show={modalStates[index].view}
                      task={task}
                      onHide={() => toggleModal("view", index)}
                      ariaLabelledBy={task.taskId}
                    />
                    <Button
                      variant='danger'
                      onClick={() => toggleModal("report", index)}
                      className='mr-2'
                    >
                      Report Issue
                    </Button>
                    <ReportIssueModal
                      show={modalStates[index].report}
                      task={task}
                      onHide={() => toggleModal("report", index)}
                    />
                    <Button
                      variant='secondary'
                      onClick={() => toggleModal("rate", index)}
                      className='mr-2'
                      disabled={!(task.status == "complete")}
                    >
                      Rate
                    </Button>
                    <StarRatingModal
                      show={modalStates[index].rate}
                      taskId={task._id}
                      onHide={() => toggleModal("rate", index)}
                    />
                  </ButtonToolbar>
                </td>
                <td className='align-middle'>
                  <IconContext.Provider value={{ style: { fontSize: "30px" } }}>
                    <OverlayTrigger
                      placement='right'
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip(
                        index,
                        task.status,
                        task.volunteerId
                      )}
                    >
                      <div>
                        {task.status == "complete" ? (
                          <TiTick />
                        ) : task.volunteerId == null ? (
                          <FaExclamationCircle />
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
};

export default TaskRequestList;
