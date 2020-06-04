import React from "react";
import { Modal, Button } from "react-bootstrap";

const DetailsModal = (props) => {
  return (
    <Modal {...props} size='lg' aria-labelledby='details-title' centered>
      <Modal.Header closeButton>
        <Modal.Title id='details-title'>Details of Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.category}</h4>
        <p>{props.description}</p>
        <br />
        <h4>Volunteer Details</h4>
        <p>{props.volDetails}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;
