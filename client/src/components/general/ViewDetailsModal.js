import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ViewDetailsModal = (props) => {
  const { date, id, category, description, volunteerId, basket } = props.task;

  return (
    <Modal {...props} size='lg' aria-labelledby='details-title' centered>
      <Modal.Header>
        <Modal.Title aria-labelledby='details-title'>
          Request Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>{`Task Number: #${id}`}</h6>
        <h6>{`Task Category: ${category}`}</h6>
        <h6>{`Date: ${date}`}</h6>
        <h6>{`Volunteer: ${volunteerId}`}</h6>
        <h6>{`Basket: ${basket}`}</h6>
        <br />
      </Modal.Body>
      <Modal.Footer className='text-center'>
        <Button variant='dark' onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDetailsModal;
