import React from "react";
import {Nav, Container, Card, Button} from "react-bootstrap";
import TaskItem from "./TaskItem";


const TaskRequestList = (props) => {

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
                        <Nav.Item>
                            <Nav.Link href="#first"> Actions </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card border= "primary">
                        <Nav fill justify>
                            <Nav.Item>
                                12/6/2020
                            </Nav.Item>
                            <Nav.Item>
                                #2870
                            </Nav.Item>
                            <Nav.Item>
                                Groceries
                            </Nav.Item>
                            <Nav.Item>
                                Bobby
                            </Nav.Item>
                            <Nav.Item>
                                <Button variant='success' size='sm' block> View Details </Button>
                                <Button variant='warning' size='sm' block> Volunteer Info </Button>
                                <Button variant='danger' size='sm' block> Report an Issue </Button>
                            </Nav.Item>
                        </Nav>
                    </Card>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TaskRequestList;