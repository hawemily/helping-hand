import React, {useState} from "react";
import { Card, Button, Modal, Table } from "react-bootstrap";
import TaskAccepted from "./TaskAccepted";

const VolunteerTaskCard = (props) => {
  var task = props.task;

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
  const timeFormat = (d) => {
    if (d === null) return "";
    const date = new Date(d);
    // console.log(task);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  const dateFormat = (d) => {
    if (d === null) return "";
    const date = new Date(d);
    return `${date.getDate()}/${date.getMonth()}/${date.getYear()}`;
  };

  const ParseBasket = () => {
    var basket = JSON.parse(task.basket);

    return (
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
        {basket.map((element, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{element.item}</td>
              <td>{element.quantity}</td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    );
  }

  return (
    <div className="taskCardWrapper">
      <Card>
        <Card.Header className='taskCardHeader'>
          <h5>{task.area}</h5>
          <p>
            {dateFormat(task.date)},{timeFormat(task.date)}, {task.distance} km
            away
          </p>
        </Card.Header>
        <Card.Body style={{ padding: "0.5rem 1rem" }}>
          <Card>
            <Card.Body className='taskCard'>
              <Card.Title style={{ margin: 0 }}>{task.category}</Card.Title>
              <Card.Text style={{ marginLeft: 0 }}>{task.description}</Card.Text>
              <p className='expandTask' onClick={showTaskModal}>
                click to expand
              </p>
            </Card.Body>
          </Card>
        </Card.Body>
        <div className='btnGrp'>
          <Button className='taskCardDetailsBtn' onClick={showPinModal}>View Details</Button>
          <Button className='taskCardAcceptBtn' onClick={showDoneModal}>Accept Task</Button>
        </div>
      </Card>

      <Modal className="taskModal" show={showTask} onHide={closeTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>{task.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body><ParseBasket /></Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={closeTaskModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal className="pinModal" show={showPin} onHide={closePinModal}>
        <Modal.Header closeButton>
          <Modal.Title>This is the person they're gonna help lol</Modal.Title>
        </Modal.Header>
        <Modal.Body>PIN id is {task.task.pinId}</Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={closePinModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <TaskAccepted show={showAllDone} hide={closeDoneModal} />
    </div>
  );
};

export default VolunteerTaskCard;
