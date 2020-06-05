import React, {useState} from "react";
import {Container, Button, Table, Row, Col} from "react-bootstrap";
import DetailsModal from "../DetailsModal";
import {TiTick} from "react-icons/ti";
import {GiEmptyHourglass} from "react-icons/gi";

import {IconContext} from "react-icons";


const VolunteerTaskList = (props) => {
    const tasks = props.tasks;
    //TODO: there is a bug with the not completed button, it should turn green and disable on first click
    // but rn its disabling all buttons at the start and are not the right colours
    const [detailsModalShow, setDetailsModalShow] = useState(false);

    const state = {
        colorButton: 'danger',
        isClicked: false
    };

    function taskComplete() {
        if (state.isClicked === false) {
            state.colorButton= 'success';
            state.isClicked= true;
        }
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
                {tasks.map((task) => {
                    const {date, id, category, volunteerId, description} = task;
                    return (
                        <tr
                            className={`text-center ${
                                task.isCompleted
                                    ? "confirmed"
                                    : "pending"
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
                                            variant={state.colorButton} onClick={taskComplete()}
                                            disabled={state.isClicked}>
                                            Not Completed
                                        </Button>
                                    </Col>
                                </Row>
                            </td>
                            <td className='align-middle'>
                                <IconContext.Provider value={{style: {fontSize: "30px"}}}>
                                    <div>
                                        {task.isCompleted ?
                                            <TiTick/>
                                            : <GiEmptyHourglass/>}
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
