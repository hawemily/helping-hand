import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AllDone = (props) => {
  const loadNextPage = () => {
    window.location.href = "/service/requestList";
    props.onHide();
  };

  return (
    <Modal {...props} centered>
      <Modal.Header
        style={{ color: "#39587a", fontFamily: "Rasa", fontSize: "1.5rem" }}
      >
        Sit tight while we match your request to one of our helpful volunteers!
      </Modal.Header>
      <Modal.Body>
        They will reach out to you very soon through your preferred mode of
        communication. After that, you may log on to learn more about your
        assigned volunteer and their reviews from other members of the
        HelpingHand community.
      </Modal.Body>
      <Modal.Footer>
        <Button color='primary' onClick={loadNextPage}>
          View All Requests
        </Button>{" "}
      </Modal.Footer>
    </Modal>
  );
};

export default AllDone;
