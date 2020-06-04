import React, { useState, useEffect } from "react";
import { Col, Row, Container, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import AddItem from "./AddItem";

const GroceryForm = (props) => {
  const [groceryItems, setGroceryItems] = useState([]);
  useEffect(() => {});

  const [store, setStore] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  return (
    <Container className='border border-dark'>
      <Form className='m-3'>
        <Row form>
          <Col md={6}>
            <Form.Group controlId='grocer'>
              <Form.Label>Preferred Grocery Store:</Form.Label>
              <Form.Control
                type='text'
                value={store}
                onChange={(e) => setStore(e.target.value)}
                placeholder='Enter the Grocery Store'
              />
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
              <AddItem />
            </Form.Group>
          </Col>
          <Col md={6}></Col>
        </Row>
      </Form>
    </Container>
  );
};

export default GroceryForm;
