// Todo for JIn
import React from "react";
import {
    Card,
    Button
} from "react-bootstrap";

const VolunteerTaskCard = (props) => {
    var task = props.task;

    // must calculate distance based on current location and area given
    // and parse date before passing in through props

    return ( 
    <Card style={{width: '50%', margin: '0.5rem'}}>
        <Card.Header className="taskCardHeader">
            <h5>{task.area}</h5>
            <p>{task.date}, {task.distance} km away</p>
        </Card.Header>
        <Card.Body style={{padding: '0.5rem 1rem'}}>
            <Card>
            <Card.Body className="taskCard">
                <Card.Title style={{margin: 0}}>{task.category}</Card.Title>
                <Card.Text style={{marginLeft: 0}}>{task.description}</Card.Text>
                <p className="expandTask" onclick={props.expand}>click to expand</p>
            </Card.Body>
            </Card>
        </Card.Body>
        <div className="btnGrp">
            <Button className="taskCardDetailsBtn">View Details</Button>
            <Button className="taskCardAcceptBtn">Accept Task</Button>
        </div>
    </Card>
    );
}

export default VolunteerTaskCard;