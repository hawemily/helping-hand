import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button, ToggleButton, ButtonGroup } from 'react-bootstrap';

const Register = (props) => {

  const { show, close } = props;

  const [radioValue, setRadioValue] = useState('1');

  const firstName = React.createRef();
  const lastName = React.createRef();
  const email = React.createRef();
  const password = React.createRef();
  const phoneNumber = React.createRef();

  const radios = [
    { name: 'Looking for Help', value: 'pin' },
    { name: 'Looking to Volunteer', value: 'volunteer' },
  ];

  var registerResult = '';

  async function register(e) {
    var resultMsg = document.getElementById('result-msg');
    e.preventDefault();
    document.getElementById("registerBtn").disabled = true;
    var volunteer = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      phoneNumber: phoneNumber.current.value
    };
    // connect to pin backend when ready

    if (radioValue == 'volunteer') {
      axios.post("/volunteers", volunteer)
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          registerResult = 'Registration successful! Please login now to access our services.';
        } else {
          registerResult = 'Something went wrong. Please try again.';
          document.getElementById("registerBtn").disabled = true;
          resultMsg.classList.add('error');
        }
        resultMsg.innerText = registerResult;
        resultMsg.classList.add('show');
      })
    }
  }

  return (
    <Modal onHide={close} show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={(e) => register(e)}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control ref={firstName} placeholder="First Name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control ref={lastName} placeholder="Last Name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control ref={email} type="email" placeholder="Enter email" />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control ref={password} type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control ref={phoneNumber} placeholder="Contact Number" />
          </Form.Group>

          <Form.Group>
            <Form.Label>What can we help you with?</Form.Label>
              <ButtonGroup toggle style={{display: "block"}}>
              {radios.map((radio, idx) => (
                <ToggleButton
                  className="typeToggleButtons"
                  key={idx}
                  type="radio"
                  variant="secondary"
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Form.Group>

          <Form.Group id="result-msg">
            <Form.Text>{registerResult}</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" className="submitBtn" id="registerBtn">
            Register
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
  );
}

export default Register;