import React, { useState } from "react";
import { Container, Button, Table, Row, Col } from "react-bootstrap";
import DetailsModal from "../DetailsModal";
import { TiTick } from "react-icons/ti";
import { GiEmptyHourglass } from "react-icons/gi";

import { IconContext } from "react-icons";
import TaskRequestList from "../general/TaskRequestList";

const VolunteerTaskList = (props) => {
  const tasks = props.tasks;

  const [detailsModalShow, setDetailsModalShow] = useState(false);

  const defaultState = {
    colorButton: "danger",
    isClicked: false,
  };

  const [buttonStates, setButtonStates] = useState(
    Array(tasks.length).fill(defaultState)
  );
  console.log("BUTTONSTATESS");
  console.log(buttonStates);

  const taskComplete = (value) => {
    console.log(value);
    const newStates = buttonStates.map((item, index) => {
      if (index === value) {
        const updatedState = {
          ...item,
          colorButton: "success",
          isClicked: !item.isClicked,
        };
        return updatedState;
      }
      return item;
    });
    setButtonStates(newStates);
  };

  return (
    <Container variant='flush'>
      <Table>
        <thead>
          <tr className='text-center'>
            <th>Date</th>
            <th>Request No.</th>
            <th>Service</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            const { date, id, category, volunteerId, description } = task;
            return (
              <tr
                className={`text-center ${
                  buttonStates[index].isClicked ? "confirmed" : "pending"
                }`}
                key={id}
              >
                <td className='align-middle'>{date}</td>
                <td className='align-middle'>#{id}</td>
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
                      <div id={id}>
                        <DetailsModal
                          show={detailsModalShow}
                          task={task}
                          onHide={() => setDetailsModalShow(false)}
                          ariaLabelledBy={task.id}
                        />
                      </div>
                    </Col>

                    <Col>
                      <Button
                        variant={buttonStates[index].colorButton}
                        onClick={() => taskComplete(index)}
                        disabled={buttonStates[index].isClicked}
                      >
                        Not Completed
                      </Button>
                    </Col>
                  </Row>
                </td>
                <td className='align-middle'>
                  <IconContext.Provider value={{ style: { fontSize: "30px" } }}>
                    <div>
                      {buttonStates[index].isClicked ? (
                        <TiTick />
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
    </Container>
  );
};

export default VolunteerTaskList;
