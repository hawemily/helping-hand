import React from "react";
import {Button, Card, Nav} from "react-bootstrap";

const TaskItem = (props) => {
    const task = props.task;

    return (
        <Card className={task.isCompleted ? 'taskListCompleted' : (task.volunteerId == null ? 'taskListPending' : 'taskListConfirmed')}>
            <Nav fill justify>
                <Nav.Item><h5> {task.date} </h5></Nav.Item>
                <Nav.Item><h5> #{task.id} </h5></Nav.Item>
                <Nav.Item><h5> {task.category} </h5></Nav.Item>
                <Nav.Item><h5>{task.volunteerId}</h5></Nav.Item>
            </Nav>
            <div className="btnGrp">
                <Button className="taskCardDetailsBtn">View Details</Button>
                <Button className="taskCardAcceptBtn">Volunteer Info</Button>
                <Button className="taskCardReportBtn">Report an Issue</Button>
            </div>
        </Card>
    );
};

export default TaskItem;