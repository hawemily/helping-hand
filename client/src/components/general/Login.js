import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const Login = (props) => {

  const { show, close, auth } = props;

  const email = React.createRef();
  const password = React.createRef();

  async function login(e) {
    e.preventDefault();
    document.getElementById('loginBtn').disabled = true;
    await new Promise((res, rej) => auth.login({email: email.current.value, password: password.current.value}, res, rej))
    .then((result) => {
      if (!result) {
        document.getElementById('error-msg').classList.add('error');
        document.getElementById('loginBtn').disabled = false;
      }
    })
    .catch((err) => console.error(err));
  }

  return (
    <Modal onHide={close} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={(e) => login(e)}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group id="error-msg">
          <Form.Text>Unable to find the email address and password combination entered.</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className="submitBtn" id="loginBtn">
          Login
        </Button>
      </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;