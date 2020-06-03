import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AllDone = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} centered>
        <ModalHeader style={{color: '#39587a', fontFamily: 'Rasa'}}>Request Submitted!</ModalHeader>
        <ModalBody>
          <b>Sit tight while we match your request to one of our helpful volunteers.</b><br />
          They will reach out to you very soon through your preferred mode of communication. After that, you may log on to  learn more about your assigned volunteer and their reviews from other members of the HelpingHand community.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>View All Requests</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AllDone;