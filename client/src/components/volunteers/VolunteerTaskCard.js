import React, { useState } from "react";
import { Card, Button, Modal, Table } from "react-bootstrap";
import TaskAccepted from "./TaskAccepted";
import ViewOnlyBasket from "./ViewOnlyBasket";
import { formatDate, formatTime } from "../general/dateTimeFormatter";
import axios from "axios";

const VolunteerTaskCard = (props) => {
  var task = props.task;
  var pinId = task.pinId;
  var service = task.service;
  const auth = props.auth;

  const volunteerId = localStorage.getItem("id_token");

  const [loadedPin, setLoadedPin] = useState({});
  const [showTask, setShowTask] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showAllDone, setShowDone] = useState(false);

  const closeTaskModal = () => setShowTask(false);
  const showTaskModal = () => setShowTask(true);

  const closePinModal = () => setShowPin(false);
  const showPinModal = () => {
    loadPinInfo(pinId).then(() => {setShowPin(true);});
  };

  const showDoneModal = () => setShowDone(true);
  const closeDoneModal = () => setShowDone(false);

  // must calculate distance based on current location and area given
  // and parse date before passing in through props

  const defaultPin = {
    firstName: "Not found",
    lastName: "Not found",
    streetName: "Not found",
    firstAddress: "Not found",
    postCode: "Not found",
    email: "Not found",
    phoneNumber: "Not found",
  }

  const loadPinInfo = (pinId) => {
    return new Promise((resolve, reject) => {
      axios.get("/pins/" + pinId).then((pin) => {
        setLoadedPin(pin.data.pin != null ? pin.data.pin : defaultPin);
        resolve();
      });
    });
  };

  const acceptTask = () => {
    axios
      .post("/tasks/assign", {
        id: task._id,
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

  const generateDetails = (service) => {
    if (service.category == 'Grocery') {
      return "Groceries from " + service.details.store;
    } else if (service.category == 'Laundry') {
      return "Laundry (" + service.details.load + " loads)";
    } else {
      return "";
    }
  }

  return (
    <div className='taskCardWrapper'>
      <Card>
        <Card.Header className='taskCardHeader'>
          <h5>{service.area}</h5>
          <p>
            {formatDate(service.date)}, {formatTime(service.date)}
          </p>
        </Card.Header>
        <Card.Body style={{ padding: "0.5rem 1rem" }}>
          <Card>
            <Card.Body className='taskCard'>
              <Card.Title style={{ margin: 0 }}>{generateDetails(service)}</Card.Title>
              <Card.Text style={{ marginLeft: 0 }}>
                {task.description}
              </Card.Text>
              <p
                className='expandTask'
                onClick={
                  auth.isAuthenticated() ? showTaskModal : () => notice()
                }
                // onClick={showTaskModal}
              >
                click to expand
              </p>
            </Card.Body>
          </Card>
        </Card.Body>
        <div className='btnGrp'>
          <Button
            className='taskCardDetailsBtn'
            onClick={auth.isAuthenticated() ? showPinModal : () => notice()}
            // onClick={showPinModal}
          >
            View Details
          </Button>
          <Button
            className='taskCardAcceptBtn'
            onClick={auth.isAuthenticated() ? acceptTask : () => notice()}
            // onClick={acceptTask}
          >
            Accept Task
          </Button>
        </div>
      </Card>

      <Modal className='taskModal' show={showTask} onHide={closeTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>{service.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewOnlyBasket check='true' category={service.category} basket={service.details.basket} />
        </Modal.Body>
        <Modal.Footer>
          <Button className='modalBtn' onClick={closeTaskModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal className='pinModal' show={showPin} onHide={closePinModal}>
        <Modal.Header closeButton>
          <Modal.Title>Person You're Helping</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <tr>
              <td>Name</td>
              <td>{loadedPin.firstName + " " + loadedPin.lastName}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                  <p className="address-lines">{loadedPin.firstAddress}</p>
                  <p className="address-lines">{loadedPin.streetName}</p>
                  <p className="address-lines">{loadedPin.postCode}</p>
              </td>
            </tr>
            <tr>
              <td>Contact Number</td>
              <td>{loadedPin.phoneNumber}</td>
            </tr>
            <tr>
              <td>Email Address</td>
              <td>{loadedPin.email}</td>
            </tr>
          </Table>
        </Modal.Body>
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
