import React, { useState, useEffect } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";

const Volunteer = (props) => {
  const [volunteers, setVolunteers] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    axios
      .get("/volunteers")
      .then((volunteers) => setVolunteers(volunteers))
      .catch((err) => console.log(err));
  }, []);

  function submitForm() {
    if (username === "") {
      alert("Username field is mandatory");
      return;
    }
    if (email === "") {
      alert("Email field is mandatory");
      return;
    }
    if (jobType === "") {
      alert("Job field is mandatory");
      return;
    }
    axios
      .post("/volunteers", {
        name: username,
        email: email,
        jobType: jobType,
      })
      .then(function () {
        alert("Account created successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert("Could not create account. Please try again.");
        console.log(err);
      });
  }

  // function deleteEntry() {
  //   axios.delete
  // }

  const vs = [{ username: "John", email: "abc@123.com", jobType: "Groceries" }];
  function seeVs() {
    for (var i = 0; i < volunteers.length; i++) {
      console.log(volunteers[i].name);
    }
  }
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className='jobs-list'>
          {vs.map((volunteer, index) => (
            <ListGroup.Item>
              Name: {volunteer.username}
              <br />
              JobType: {volunteer.jobType}
              <br />
              Email: {volunteer.email}
              <br />
              <Button className='delete-btn' color='danger' size='sm'>
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </TransitionGroup>
      </ListGroup>
      <br />
      <form onSubmit={submitForm}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type='text'
          placeholder='Enter your name'
        />
        <br />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          placeholder='Enter your email address'
        />
        <br />
        <input
          onChange={(e) => setJobType(e.target.value)}
          type='text'
          placeholder='Enter your type of job'
        />
        <br />
        <input type='submit' />
      </form>
    </Container>
  );
};

export default Volunteer;
