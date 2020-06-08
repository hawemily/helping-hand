import React, { useState, useEffect } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

import AddItem from "./AddItem";
import Basket from "../general/Basket";

const GroceryForm = (props) => {
  const [basket, setBasket] = useState([]);

  const [store, setStore] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();

  const [redirectToTaskList, setRedirectToTaskList] = useState(false);

  const resetList = () => {
    setBasket([]);
  };

  const stores = [
    "Sainsburys",
    "Tesco",
    "M&S",
    "Aldi",
    "Lidl",
    "Waitrose",
    "Whole Foods",
  ];

  const onSubmit = () => {
    if (store === "") {
      alert("Store cannot be empty!");
      return;
    }
    if (basket.length === 0) {
      alert("Basket cannot be empty!");
      return;
    }
    axios
      .post("/services/groceries", {
        pinId: "tempPinId",
        area: "some area",
        store: store,
        date: date,
        time: time,
        basket: JSON.stringify(basket),
      })
      .then(() => {
        alert("Grocery request has been submitted");
        window.location.reload();
      })
      .catch((err) => {
        alert(
          "Could not submit grocery list. Please try again in a few seconds."
        );
        console.log(err);
      });
    setRedirectToTaskList(!redirectToTaskList);
  };

  if (redirectToTaskList) {
    return <Redirect to='/services/requestList' />;
  } else {
    return (
      <Container>
        <Container className='border border-dark m-3 p-4'>
          <Row form>
            <Col md={6}>
              <Form.Group controlId='grocer'>
                <Form.Label>Preferred Grocery Store:</Form.Label>
                <Form.Control
                  as='select'
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                >
                  <option value={""} disabled selected>
                    Select your Store:
                  </option>
                  {stores.sort().map((store) => (
                    <option value={store}>{store}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Date:</Form.Label>
                <br />
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  withPortal
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Time:</Form.Label>
                <br />
                <DatePicker
                  selected={time}
                  onChange={(time) => setTime(time)}
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
                <Form.Check
                  type='checkbox'
                  id='default-checkbox'
                  label='Allow Substitutions'
                ></Form.Check>
              </Form.Group>
              <Form.Group>
                <Container className='border border-dark'>
                  <AddItem basket={basket} setBasket={setBasket} />
                </Container>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Basket basket={basket} setBasket={setBasket} />
            </Col>
          </Row>
          <Container className='text-center'>
            <Row>
              <Col>
                <Button variant='dark' dark onClick={onSubmit}>
                  Submit Request
                </Button>
              </Col>
              <Col>
                <Button variant='danger' onClick={resetList}>
                  Reset Basket
                </Button>
              </Col>
            </Row>
          </Container>
        </Container>
        <br />
        <div>
          <Button variant='dark' tag={Link} href='/services/requestList'>
            Return to My Requests
          </Button>
        </div>
      </Container>
    );
  }
};

export default GroceryForm;
