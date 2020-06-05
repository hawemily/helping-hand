import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

const ReportIssueModal = (props) => {
  const { date, id, category, volunteerId } = props.task;
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // do an axios call here
    props.onHide();
    alert("Congratulations! Your issue has been reported!");
  };
  return (
    <Modal {...props} size='lg' aria-labelledby='issues-title' centered>
      <Modal.Header>
        <Modal.Title aria-labelledby='issues-title'>Report A Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <h6>{`Task Number: #${id}`}</h6>
          <h6>{`Task Category: ${category}`}</h6>
          <h6>{`Date: ${date}`}</h6>
          <h6>{`Volunteer: ${volunteerId}`}</h6>
          <br />

          <Form.Group controlId='issueForm.description'>
            <Form.Label>
              <h5>What went wrong?*</h5>
            </Form.Label>
            <Form.Control
              as='textarea'
              ref={register({
                required: {
                  value: true,
                  message:
                    "Please describe what went wrong with your experience!",
                },
              })}
              name='issueDesc'
              rows='4'
            />
            {errors.issueDesc && <p>{errors.issueDesc.message}</p>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className='text-center'>
          <Button variant='dark' type='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReportIssueModal;
