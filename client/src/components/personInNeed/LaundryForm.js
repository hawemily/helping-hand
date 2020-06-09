import React, {useState, useEffect} from "react"
import {useForm} from "react-hook-form";
import {Link, Redirect} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, addDays} from "date-fns";
import axios from "axios";


// TODO: alert saying the request has been submitted doesn't register
const LaundryForm = (props) => {
    const { register, handleSubmit, errors } = useForm()

    const [dateOfPickup, setDateOfPickup] = useState(new Date());
    const [timeOfPickup, setTimeOfPickup] = useState();
    const [dateOfDropoff, setDateOfDropoff] = useState(new Date());
    const [timeOfDropoff, setTimeOfDropoff] = useState();

    const [redirectToTaskList, setRedirectToTaskList] = useState(false);


    const onSubmit = (data) => {
        console.log(data);

        axios
            .post("/getHelp/laundry", {
                pinId: 'tempPinId',
                area: 'someLocation',
                load: data.load,
                dateOfPickup: dateOfPickup,
                timeOfPickup: timeOfPickup,
                dateOfDropoff: dateOfDropoff,
                timeOfDropoff: timeOfDropoff,
                tops: data.tops,
                bottoms: data.bottoms,
                shoes: data.shoes,
                socks: data.socks,
                outerwear: data.outerwear,
                intimates: data.intimates
            })
            .then(() => {
                alert("Laundry request has been submitted");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
        setRedirectToTaskList(!redirectToTaskList);
    };

    if (redirectToTaskList) {
        return <Redirect to='/getHelp/requestList' />;
    } else {
        return (
            <Container>
                <Container className='border border-dark'>
                    <Form className='m-3' onSubmit={handleSubmit(onSubmit)}>
                        <Row form>
                            <Col md={6}>
                                <Form.Group controlId='laundry'>
                                    <Form.Label>Loads of Laundry:</Form.Label>
                                    <Form.Control
                                        type='number'
                                        name='load'
                                        ref={register({ required: true , max: 5 , min: 1 })}
                                        placeholder='Enter the number of loads of laundry'
                                    />
                                    {errors.load && errors.load.type === "required" && (
                                        <p>This is a required field.</p>
                                    )}
                                    {errors.load && errors.load.type === "max" && (
                                        <p>Only up to 5 loads allowed.</p>
                                    )}
                                    {errors.load && errors.load.type === "min" && (
                                        <p>Minimum number of loads is 1.</p>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Date of Pickup:</Form.Label>
                                    <br />
                                    <DatePicker
                                        selected={dateOfPickup}
                                        onChange={(dateOfPickup) => setDateOfPickup(dateOfPickup)}
                                        minDate={new Date()}
                                        showDisabledMonthNavigation
                                        withPortal
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Time of Pickup:</Form.Label>
                                    <br />
                                    <DatePicker
                                        selected={timeOfPickup}
                                        onChange={(timeOfPickup) => setTimeOfPickup(timeOfPickup)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        minTime={setHours(setMinutes(new Date(), 30), 8)}
                                        maxTime={setHours(setMinutes(new Date(), 30), 17)}
                                        timeIntervals={15}
                                        timeCaption='Time'
                                        dateFormat='h:mm aa'
                                        withPortal
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Date of Drop-off:</Form.Label>
                                    <br />
                                    <DatePicker
                                        selected={addDays(dateOfDropoff, 1)}
                                        onChange={(dateOfDropoff) => setDateOfDropoff(dateOfDropoff)}
                                        minDate={addDays(dateOfPickup, 1)}
                                        maxDate={addDays(dateOfPickup, 5)}
                                        showDisabledMonthNavigation
                                        withPortal
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Time of Drop-off:</Form.Label>
                                    <br />
                                    <DatePicker
                                        selected={timeOfDropoff}
                                        onChange={(timeOfDropoff) => setTimeOfDropoff(timeOfDropoff)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        minTime={setHours(setMinutes(new Date(), 30), 8)}
                                        maxTime={setHours(setMinutes(new Date(), 30), 17)}
                                        timeIntervals={15}
                                        timeCaption='Time'
                                        dateFormat='h:mm aa'
                                        withPortal
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <h6>Number of items:</h6>
                                <Form.Group>
                                    <Form.Control
                                        type='number'
                                        name='tops'
                                        ref={register({ required: true, min: 0})}
                                        placeholder='Enter number of tops'
                                        />
                                    {errors.tops && errors.tops.type === "min" && (
                                        <p>Minimum number of tops is 0.</p>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type='number'
                                        name='bottoms'
                                        ref={register({ required: true, min: 0})}
                                        placeholder='Enter number of bottoms'
                                    />
                                    {errors.bottoms && errors.bottoms.type === "min" && (
                                        <p>Minimum number of bottoms is 0.</p>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type='number'
                                        name='shoes'
                                        ref={register({ required: true, min: 0})}
                                        placeholder='Enter number of shoes (in pairs)'
                                    />
                                    {errors.shoes && errors.shoes.type === "min" && (
                                        <p>Minimum number of shoes is 0.</p>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type='number'
                                        name='socks'
                                        ref={register({ required: true, min: 1})}
                                        placeholder='Enter number of socks (in pairs)'
                                    />
                                    {errors.socks && errors.socks.type === "min" && (
                                        <p>Minimum number of socks is 0.</p>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type='number'
                                        name='outerwear'
                                        ref={register({ required: true, min: 0})}
                                        placeholder='Enter number of outerwear'
                                    />
                                    {errors.outerwear && errors.outerwear.type === "min" && (
                                        <p>Minimum number of outerwear is 0.</p>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type='number'
                                        name='intimates'
                                        ref={register({ required: true, min: 0})}
                                        placeholder='Enter number of intimates'
                                    />
                                    {errors.intimates && errors.intimates.type === "min" && (
                                        <p>Minimum number of intimates is 0.</p>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        type='checkbox'
                                        id='default-checkbox'
                                        label='I will provide detergent'
                                    ></Form.Check>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Container className='text-center'>
                            <Row>
                                <Col>
                                    <Button variant='dark' dark type='submit'>
                                        Submit Request
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Container>
                <br />
                <br />
                <div>
                    <Button variant='dark' tag={Link} href='/getHelp/requestList'>
                        Return to My Requests
                    </Button>
                </div>
            </Container>
        );
    }
};

export default LaundryForm;