import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, addDays } from "date-fns";
import axios from "axios";
import InformationTooltip from "./moreInfo";
import AllDone from "./allDone";

const LaundryForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [load, setLoad] = useState();

  const [tops, setTops] = useState();
  const [bottoms, setBottoms] = useState();
  const [shoes, setShoes] = useState();
  const [socks, setSocks] = useState();
  const [outerwear, setOuterwear] = useState();
  const [intimates, setIntimates] = useState();

  const [dateOfPickup, setDateOfPickup] = useState(new Date());
  const [timeOfPickup, setTimeOfPickup] = useState();
  const [dateOfDropoff, setDateOfDropoff] = useState(new Date());
  const [timeOfDropoff, setTimeOfDropoff] = useState();
  const [checked, setChecked] = useState(false);

  const [allDone, setAllDone] = useState(false);

  const clothingOptions = [
    {
      val: tops,
      func: setTops,
      type: "number",
      name: "tops",
      placeholder: "Enter number of tops",
    },
    {
      val: bottoms,
      func: setBottoms,
      type: "number",
      name: "bottoms",
      placeholder: "Enter number of bottoms",
    },
    {
      val: shoes,
      func: setShoes,
      type: "number",
      name: "shoes",
      placeholder: "Enter number of shoes (in pairs)",
    },
    {
      val: socks,
      func: setSocks,
      type: "number",
      name: "socks",
      placeholder: "Enter number of socks (in pairs)",
    },
    {
      val: outerwear,
      func: setOuterwear,
      type: "number",
      name: "outerwear",
      placeholder: "Enter number of outerwear",
    },
    {
      val: intimates,
      func: setIntimates,
      type: "number",
      name: "intimates",
      placeholder: "Enter number of intimates",
    },
  ];

  const onSubmit = (data) => {
    if (load === "") {
      alert("Number of loads cannot be empty!");
      return;
    }

    const basket = [];
    clothingOptions.map((option) =>
      basket.push({ type: option.name, amt: option.val })
    );

    console.log("outside post");
    axios
      .post("/services/laundry", {
        pinId: localStorage.getItem("id_token") || "5678",
        load: load,
        dateOfPickup: dateOfPickup,
        timeOfPickup: timeOfPickup,
        dropOffDate: dateOfDropoff,
        dropOffTime: timeOfDropoff,
        basket: basket,
        detergent: checked,
      })
      .then((res) => {
        if (res.data.success) {
          setAllDone(true);
        }
      })
      .catch((err) => {
        alert(
          "Could not submit laundry request. Please try again in a few seconds."
        );
        console.log(err);
      });
  };

  return (
    <Container>
      <Container className='border border-dark'>
        <Form className='m-3' onSubmit={handleSubmit(onSubmit)}>
          <Row form>
            <Col md={6}>
              <Form.Group controlId='laundry'>
                <Form.Row>
                  <Form.Label>Loads of Laundry:</Form.Label>
                  <InformationTooltip message='Specify how many loads of laundry you need cleaned' />
                </Form.Row>
                <Form.Control
                  type='number'
                  name='load'
                  value={load}
                  min='1'
                  max='5'
                  ref={register({ required: true })}
                  placeholder='Enter the number of loads of laundry'
                  onChange={(e) => setLoad(e.target.value)}
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
                  selected={addDays(dateOfPickup, 1)}
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
              <Form.Row>
                <h6>Number of items:</h6>
                <InformationTooltip message='Specify your number of items so you can keep track of your laundry.' />
              </Form.Row>
              {clothingOptions.map((option) => (
                <Form.Group>
                  <Form.Control
                    type='number'
                    min='0'
                    name={option.name}
                    value={option.val}
                    ref={register()}
                    onChange={(e) => {
                      option.func(e.target.value);
                    }}
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
                  value={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  label='I will provide detergent'
                ></Form.Check>
              </Form.Group>
            </Col>
          </Row>
          <Container className='text-center'>
            <Row>
              <Col>
                <Button variant='dark' dark onClick={onSubmit}>
                  Submit Request
                </Button>
                <AllDone show={allDone} onHide={setAllDone} />
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
};
export default LaundryForm;
