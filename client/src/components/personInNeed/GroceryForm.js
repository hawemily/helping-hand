import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Button,
  Image,
  Card,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

import AddItem from "./AddItem";
import Basket from "../general/Basket";
import InformationTooltip from "./moreInfo";

const GroceryForm = (props) => {
  const [basket, setBasket] = useState([]);

  const [store, setStore] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [checked, setChecked] = useState(false);

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
        pinId: localStorage.getItem("id_token"),
        store: store,
        date: date,
        time: time,
        basket: JSON.stringify(basket),
        subs: checked,
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
    return <Redirect to='/service/requestList' />;
  } else {
    return (
      <Container>
        <Container className='border border-dark m-3 p-4'>
          <Row form>
            <Col md={6}>
              <Form.Group controlId='grocer'>
                <Form.Row>
                  <Form.Label>Preferred Grocery Store:</Form.Label>
                  <InformationTooltip message='Specify where you want your groceries from' />
                </Form.Row>
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
                <Form.Row>
                  <Form.Label>Date:</Form.Label>
                  <InformationTooltip message='Select the date and time when you want your groceries to be delivered' />
                </Form.Row>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  withPortal
                  dateFormat='dd/MM/yy'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Time:</Form.Label>
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
                <Form.Row>
                  <Form.Check
                    type='checkbox'
                    value={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    id='default-checkbox'
                    label='Allow Substitutions'
                  ></Form.Check>
                  <InformationTooltip message="Tick if you want your shopper to get similar items if what you requested isn't available" />
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Card bg='light'>
                  <Card.Header as='h5'>
                    Request items one at a time then click the 'Add Item' button
                    below to add it to your grocery basket above
                  </Card.Header>
                  <Card.Body>
                    <AddItem basket={basket} setBasket={setBasket} />
                  </Card.Body>
                </Card>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Basket basket={basket} setBasket={setBasket} />
            </Col>
          </Row>
          <Container className='text-center'>
            <Row>
              <Col>
                <Button variant='danger' onClick={resetList}>
                  Reset Basket
                </Button>
              </Col>
              <Col>
                <Button variant='dark' dark onClick={onSubmit}>
                  Submit Request
                </Button>
              </Col>
            </Row>
          </Container>
        </Container>
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

export default GroceryForm;
