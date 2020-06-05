import React from "react";
import { Modal, Button } from "react-bootstrap";

const DetailsModal = (props) => {
  const { category, description, volunteerId, id } = props.task;

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
            Details of Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{category}</h4>
          <p>{description}</p>
          <br />
          <h4>Volunteer Details</h4>
          <p>{volunteerId}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailsModal;
