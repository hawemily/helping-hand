import React from "react";
import { Nav, Container, Card, Button } from "react-bootstrap";
import TaskItem from "./TaskItem";
import { array } from "prop-types";

const TaskRequestList = (props) => {
  const tasks = props.tasks;
  // props passed into task request list should have all the information shown,
  // as well as information on the volunteer who confirmed it

  return (
    <Container variant='flush'>
      <Card>
        <Card.Header>
          <Nav fill justify variant='tabs' defaultActiveKey='#first'>
            <Nav.Item>
              <Nav.Link href='#first'>
                <h4>Date</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#first'>
                <h4>Request No.</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#first'>
                <h4>Service</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#first'>
                <h4>Volunteer</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <div>
            {tasks.map((sampleTask) => {
              return <TaskItem task={sampleTask} />;
            })}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskRequestList;
