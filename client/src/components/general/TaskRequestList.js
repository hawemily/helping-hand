import React, { useState } from "react";
import { Nav, Container, Card, Button, Table, Row, Col } from "react-bootstrap";
import TaskItem from "./TaskItem";
import DetailsModal from "./DetailsModal";
import ReportIssueModal from "./ReportIssueModal";

import { array } from "prop-types";

const TaskRequestList = (props) => {
  const tasks = props.tasks;
  // props passed into task request list should have all the information shown,
  // as well as information on the volunteer who confirmed it
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  return (
    <Container variant='flush'>
      <Table>
        <thead>
          <tr className='text-center'>
            <th>Date</th>
            <th>Request No.</th>
            <th>Service</th>
            <th> Actions </th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const { date, id, category, volunteerId, description } = task;
            return (
              <tr
                className={`text-center ${
                  task.isCompleted
                    ? "completed"
                    : task.volunteerId == null
                    ? "pending"
                    : "confirmed"
                }`}
              >
                <td class='align-middle'>{date}</td>
                <td class='align-middle'>#{id}</td>
                <td class='align-middle'>{category}</td>
                <td class='align-middle'>
                  <Row>
                    <Col>
                      <Button
                        variant='primary'
                        onClick={() => setDetailsModalShow(true)}
                      >
                        More Details
                      </Button>
                      <DetailsModal
                        show={detailsModalShow}
                        description={description}
                        volDetails={volunteerId}
                        category={category}
                        onHide={() => setDetailsModalShow(false)}
                      />
                    </Col>

                    <Col>
                      <Button
                        variant='danger'
                        onClick={() => {
                          setDetailsModalShow(true);
                        }}
                      >
                        Report Issue
                      </Button>
                      <ReportIssueModal show={reportModalShow} />
                    </Col>
                  </Row>
                </td>
                <td class='align-middle'></td>
                <td class='align-middle'></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
