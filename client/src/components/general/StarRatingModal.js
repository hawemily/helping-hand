import React, { useState } from "react";
import StarRating from "./StarRating";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const StarRatingModal = (props) => {
  const [ratings, setRatings] = useState(Array(2).fill(0));

  const handleSubmit = () => {
    // do axios call here
    props.onHide();
  };

  const feedbackOptions = [
    {
      name: "time",
      message: "Was it on time?",
    },
    {
      name: "service",
      message: "Was everything that you requested accomplished?",
    },
  ];

  return (
    <Modal {...props} size='lg' centered backdrop='static'>
      <Modal.Header>Rate your volunteer!</Modal.Header>
      <Modal.Body>
        {feedbackOptions.map((option, i) => (
          <>
            <h5>{option.message}</h5>
            <StarRating
              option={option.name}
              ratings={ratings}
              setRatings={setRatings}
              index={i}
            />
          </>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Submit Reviews</Button>
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StarRatingModal;
