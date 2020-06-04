import React from "react";
import {Nav, Container, Card, Button} from "react-bootstrap";
import TaskItem from "./TaskItem";


const TaskRequestList = (props) => {
    var task = props.task;
    // props passed into task request list should have all the information shown,
    // as well as information on the volunteer who confirmed it

    return (
        <Container variant='flush'>
            <Card>
                <Card.Header>
                    <Nav fill justify variant="tabs" defaultActiveKey="#first">
                        <Nav.Item>
                            <Nav.Link href="#first">Date</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#first">Request No.</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#first"> Service </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#first"> Volunteer </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card border='success' className='taskEntry'>
                        <Nav fill justify>
                            <Nav.Item> <h5> {task.date} </h5></Nav.Item>
                            <Nav.Item> <h5> #{task.id} </h5></Nav.Item>
                            <Nav.Item><h5> {task.category} </h5> </Nav.Item>
                            <Nav.Item><h5>{task.volunteerId}</h5></Nav.Item>
                        </Nav>
                        <div className="ActionGrp">
                            <Button className="ActionDetailsBtn">View Details</Button>
                            <Button className="ActionInfoBtn">Volunteer Info</Button>
                            <Button className="ActionReportBtn"> Report an Issue </Button>
                        </div>
                    </Card>
                </Card.Body>

            </Card>
        </Container>
    );
};

export default TaskRequestList;