import React from "react";
import { Button, Modal } from "react-bootstrap";

const TaskAccepted = (props) => {
  return (
      <Modal show={props.show} onHide={props.hide} centered>
        <Modal.Header style={{ color: "#39587a"}}>
          Task Accepted!
        </Modal.Header>
        <Modal.Body>
          <b>
            Wondering what to do next?
          </b>
          <br />
          Reach out to them as soon as possible to say hello and work out the smaller details! You can find their contact information in the All Tasks page.
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={() => {window.location.href = window.location + '/taskList'}}>
            View All Tasks
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default TaskAccepted;