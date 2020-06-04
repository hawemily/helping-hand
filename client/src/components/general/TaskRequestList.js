import React from "react";
import {Nav, Container, Card, Button} from "react-bootstrap";

const TaskRequestList = (props) => {
    var task = props.task;
    // props passed into task request list should have all the information shown,
    // as well as information on the volunteer who confirmed it

    function setBorder() {
        if (task.status =='pending') return 'warning'
        if (task.status == 'confirmed') return 'success'
        if (task.status == 'completed') return 'secondary'
    }

    return (
        <Container variant='flush'>
            <Card>
                <Card.Header>
                    <Nav fill justify variant="tabs" defaultActiveKey="#first">
                        <Nav.Item>
                            <Nav.Link href="#first"><h4>Date</h4></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#first"><h4>Request No.</h4></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#first"><h4>Service</h4> </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#first"><h4>Volunteer</h4></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card border={setBorder} className="taskCard">
                        <Nav fill justify>
                            <Nav.Item> <h5> {task.date} </h5></Nav.Item>
                            <Nav.Item> <h5> #{task.id} </h5></Nav.Item>
                            <Nav.Item><h5> {task.category} </h5> </Nav.Item>
                            <Nav.Item><h5>{task.volunteerId}</h5></Nav.Item>
                        </Nav>
                        <div className="btnGrp">
                            <Button className="taskCardDetailsBtn">View Details</Button>
                            <Button className="taskCardReportBtn">Volunteer Info</Button>
                            <Button className="taskCardAcceptBtn">Report an Issue</Button>
                        </div>
                    </Card>
                </Card.Body>

            </Card>
        </Container>
    );
};

export default TaskRequestList;