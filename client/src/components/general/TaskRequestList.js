import React, { useState } from "react";
import { Nav, Container, Card, Button, Table, Row, Col } from "react-bootstrap";
import TaskItem from "./TaskItem";
import DetailsModal from "../DetailsModal";
import ReportIssueModal from "./ReportIssueModal";
import { TiTick } from "react-icons/ti";
import { GiEmptyHourglass } from "react-icons/gi";
import { FaExclamationCircle, FaHourglass } from "react-icons/fa";
import Days from "./Day";

import { IconContext } from "react-icons";

import { array } from "prop-types";

const TaskRequestList = (props) => {
  const tasks = props.tasks;
  // props passed into task request list should have all the information shown,
  // as well as information on the volunteer who confirmed it
  // THERE IS A BUG where modal only presents first elem of list
  // TODO: try componentwillupdateprops alternative
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);

  const formatDate = (dateStr) => {
    if (typeof dateStr === "undefined") {
      return;
    }

    const date = new Date(dateStr);
    console.log(typeof date.getFullYear());
    return `${Days[date.getDay()]}, 
       ${date.getDate()}/${date.getMonth()}/${(date.getFullYear() + "").slice(
      -2
    )}, `;
  };

  const formatTime = (timeStr) => {
    const time = new Date(timeStr);
    var hours = time.getHours();
    var mins = time.getMinutes();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    return `${hours}:${mins}`;
  };

  return (
    <Container variant='flush'>
      <Table>
        <thead>
          <tr className='text-center'>
            <th>Date</th>
            <th>Request No.</th>
            <th>Service</th>
            <th> Actions </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const {
              date,
              time,
              taskId,
              category,
              volunteerId,
              description,
            } = task;
            return (
              <tr
                className={`text-center ${
                  task.isCompleted
                    ? "completed"
                    : task.volunteerId == null
                    ? "pending"
                    : "confirmed"
                }`}
                key={taskId}
              >
                <td className='align-middle'>
                  {formatDate(date)}
                  {formatTime(time)}
                </td>
                <td className='align-middle'>#{taskId}</td>
                <td className='align-middle'>{`${category}`}</td>
                <td className='align-middle'>
                  <Row>
                    <Col>
                      <Button
                        variant='primary'
                        onClick={() => setDetailsModalShow(true)}
                      >
                        More Details
                      </Button>
                      <div id={taskId}>
                        <DetailsModal
                          show={detailsModalShow}
                          task={task}
                          onHide={() => setDetailsModalShow(false)}
                          ariaLabelledBy={task.taskId}
                        />
                      </div>
                    </Col>

                    <Col>
                      <Button
                        variant='danger'
                        onClick={() => {
                          setReportModalShow(true);
                        }}
                      >
                        Report Issue
                      </Button>
                      <ReportIssueModal
                        show={reportModalShow}
                        task={task}
                        onHide={() => setReportModalShow(false)}
                      />
                    </Col>
                  </Row>
                </td>
                <td className='align-middle'>
                  <IconContext.Provider value={{ style: { fontSize: "30px" } }}>
                    <div>
                      {task.isCompleted ? (
                        <TiTick />
                      ) : task.volunteerId == null ? (
                        <FaExclamationCircle />
                      ) : (
                        <GiEmptyHourglass />
                      )}
                    </div>
                  </IconContext.Provider>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <Card>
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
      </Card> */}
    </Container>
  );
};

export default TaskRequestList;
