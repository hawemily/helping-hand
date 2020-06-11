import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import TaskAccepted from "./TaskAccepted";
import ViewOnlyBasket from "./ViewOnlyBasket";
import { formatDate, formatTime } from "../general/dateTimeFormatter";
import axios from "axios";

const VolunteerTaskCard = (props) => {
  var task = props.task;
  const auth = props.auth;

  const volunteerId = localStorage.getItem("id_token");

  const [showTask, setShowTask] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showAllDone, setShowDone] = useState(false);

  const closeTaskModal = () => setShowTask(false);
  const showTaskModal = () => setShowTask(true);

  const closePinModal = () => setShowPin(false);
  const showPinModal = () => setShowPin(true);

  const showDoneModal = () => setShowDone(true);
  const closeDoneModal = () => setShowDone(false);

  // must calculate distance based on current location and area given
  // and parse date before passing in through props

  const acceptTask = () => {
    axios
      .post("/tasks/assign", {
        id: task.taskId,
        volunteerId: volunteerId,
      })
      .then((res) => {
        if (res.data.success) {
          showDoneModal();
        } else {
          console.error("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const notice = () => {
    alert("Please log in or register to access this feature.");
  };

  return (
    <div className='taskCardWrapper'>
      <Card>
        <Card.Header className='taskCardHeader'>
          <h5>{task.area}</h5>
          <p>
            {formatDate(task.date)},{formatTime(task.date)}, {task.distance} km
            away
          </p>
        </Card.Header>
        <Card.Body style={{ padding: "0.5rem 1rem" }}>
          <Card>
            <Card.Body className='taskCard'>
              <Card.Title style={{ margin: 0 }}>{task.category}</Card.Title>
              <Card.Text style={{ marginLeft: 0 }}>
                {task.description}
              </Card.Text>
              <p
                className='expandTask'
                // onClick={auth.isAuthenticated() ? showTaskModal : () => notice()}
                onClick={showTaskModal}
              >
                click to expand
              </p>
            </Card.Body>
          </Card>
        </Card.Body>
        <div className='btnGrp'>
          <Button
            className='taskCardDetailsBtn'
            // onClick={auth.isAuthenticated() ? showPinModal : () => notice()}
            onClick={showPinModal}
          >
            View Details
          </Button>
          <Button
            className='taskCardAcceptBtn'
            // onClick={auth.isAuthenticated() ? acceptTask : () => notice()}
            onClick={acceptTask}
          >
            Accept Task
          </Button>
        </div>
      </Card>

      <Modal className='taskModal' show={showTask} onHide={closeTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>{task.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewOnlyBasket basket={task.basket} />
        </Modal.Body>
        <Modal.Footer>
          <Button className='modalBtn' onClick={closeTaskModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal className='pinModal' show={showPin} onHide={closePinModal}>
        <Modal.Header closeButton>
          <Modal.Title>This is the person they're gonna help lol</Modal.Title>
        </Modal.Header>
        <Modal.Body>PIN id is {task.pinId}</Modal.Body>
        <Modal.Footer>
          <Button className='modalBtn' onClick={closePinModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <TaskAccepted show={showAllDone} hide={closeDoneModal} />
    </div>
  );
};

export default VolunteerTaskCard;
