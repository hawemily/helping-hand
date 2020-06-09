import React from "react";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import ViewOnlyBasket from "./volunteers/ViewOnlyBasket";

const DetailsModal = (props) => {
  if (localStorage.getItem("user_type") == "volunteer") {
    // For Volunteers
    const { pinId, volunteerId, id } = props.task.task;
    const {  time, category, area, basket, date, optionOne, store, taskId } = props.task.service;

    const getPinInfo = () => {
      // if (props.show) {
      //   axios.get("/pins/")
      // }
    }

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
            <p>{() => getPinInfo()}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    // For PINs
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
            {/* use another thingy cus ViewOnlyBasket doesnt allow edits cus i made it only with volunteers in mind or u can modify it */}
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
