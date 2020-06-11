import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, addDays } from "date-fns";
import axios from "axios";

// TODO: alert saying the request has been submitted doesn't register
const LaundryForm = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const [dateOfPickup, setDateOfPickup] = useState(new Date());
  const [timeOfPickup, setTimeOfPickup] = useState();
  const [dateOfDropoff, setDateOfDropoff] = useState(new Date());
  const [timeOfDropoff, setTimeOfDropoff] = useState();

  const [redirectToTaskList, setRedirectToTaskList] = useState(false);

  const clothingOptions = [
    {
      type: "number",
      name: "tops",
      placeholder: "Enter number of tops",
    },
    {
      type: "number",
      name: "bottoms",
      placeholder: "Enter number of bottoms",
    },
    {
      type: "number",
      name: "shoes",
      placeholder: "Enter number of shoes (in pairs)",
    },
    {
      type: "number",
      name: "socks",
      placeholder: "Enter number of socks (in pairs)",
    },
    {
      type: "number",
      name: "outerwear",
      placeholder: "Enter number of outerwear",
    },
    {
      type: "number",
      name: "intimates",
      placeholder: "Enter number of intimates",
    },
  ];

  const onSubmit = (data) => {
    if (data.load === "") {
      alert("Number of loads cannot be empty!");
      return;
    }

    console.log("DATAAAAA");
    console.log(data);
    // bug here -> data log weird class stuff

    const basket = [];
    clothingOptions.map((option) =>
      basket.push({ type: option.name, amt: data[option.name] })
    );

    console.log(data.tops);
    console.log(clothingOptions[0]);
    console.log(clothingOptions[0].name);
    console.log(data[clothingOptions[0].name]);
    console.log(basket);

    axios
      .post("/services/laundry", {
        pinId: "tempPinId",
        load: data.load,
        dateOfPickup: dateOfPickup,
        timeOfPickup: timeOfPickup,
        dateOfDropoff: dateOfDropoff,
        timeOfDropoff: timeOfDropoff,
        basket: basket,
      })
      .then(() => {
        alert("Laundry request has been submitted");
        window.location.reload();
      })
      .catch((err) => {
        alert(
          "Could not submit laundry request. Please try again in a few seconds."
        );
        console.log(err);
      });
    setRedirectToTaskList(!redirectToTaskList);
  };

  if (redirectToTaskList) {
    return <Redirect to='/service/requestList' />;
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
                    min='1'
                    max='5'
                    ref={register({ required: true })}
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
                    onChange={(dateOfDropoff) =>
                      setDateOfDropoff(dateOfDropoff)
                    }
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
                    onChange={(timeOfDropoff) =>
                      setTimeOfDropoff(timeOfDropoff)
                    }
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
                {clothingOptions.map((option) => (
                  <Form.Group>
                    <Form.Control
                      type={option.type}
                      min='0'
                      name={option.name}
                      ref={register()}
                      placeholder={option.placeholder}
                    />
                    {errors.name && errors.option.name.type === "min" && (
                      <p>Minimum number of {option.name} is 0.</p>
                    )}
                  </Form.Group>
                ))}
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
                  <Button variant='dark' dark type='submit' onClick={onSubmit}>
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
          <Button variant='dark' tag={Link} href='/service/requestList'>
            Return to My Requests
          </Button>
        </div>
      </Container>
    );
  }
};

export default LaundryForm;
