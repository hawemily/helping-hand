import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AllDone = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color='danger' onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className} centered>
        <Modal.Header style={{ color: "#39587a", fontFamily: "Rasa" }}>
          Request Submitted!
        </Modal.Header>
        <Modal.Body>
          <b>
            Sit tight while we match your request to one of our helpful
            volunteers.
          </b>
          <br />
          They will reach out to you very soon through your preferred mode of
          communication. After that, you may log on to learn more about your
          assigned volunteer and their reviews from other members of the
          HelpingHand community.
        </Modal.Body>
        <Modal.Footer>
          <Button color='primary' onClick={toggle}>
            View All Requests
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllDone;
