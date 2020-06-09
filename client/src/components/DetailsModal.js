import React from "react";
import { Modal, Button } from "react-bootstrap";
import ViewOnlyBasket from "./volunteers/ViewOnlyBasket";

const DetailsModal = (props) => {
  if (localStorage.getItem("user_type") == "volunteer") {
    const { pinId, volunteerId, id } = props.task.task;
    const {  time, category, area, basket, date, optionOne, store, taskId } = props.task.service;

    return (
      <div id={id}>
        <Modal
          {...props}
          size='lg'
          aria-labelledby={props.ariaLabelledBy}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id={props.ariaLabelledBy}>
              Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{category}</h4>
            <ViewOnlyBasket basket={basket} />
            <br />
            <h4>Person You Will Help</h4>
            <p>{pinId}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    const { category, taskId, basket, volunteerId } = props.task;
    console.log(basket);

    return (
      <div id={taskId}>
        <Modal
          {...props}
          size='lg'
          aria-labelledby={props.ariaLabelledBy}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id={props.ariaLabelledBy}>
              Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{category}</h4>
            <ViewOnlyBasket basket={basket} />
            <br />
            <h4>Your Volunteer</h4>
            <p>{volunteerId}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default DetailsModal;
