import React, { useState } from "react";
import { Modal, ButtonToolbar, Form, Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { setHours, setMinutes } from "date-fns";
import DatePicker from "react-datepicker";
import { formatTime, formatDate } from "./dateTimeFormatter";
import Basket from "./Basket";

const stores = [
  "Sainsburys",
  "Tesco",
  "M&S",
  "Aldi",
  "Lidl",
  "Waitrose",
  "Whole Foods",
];
const EditDetailsModal = (props) => {
  const task = props.task;
  const { register, handleSubmit, errors } = useForm();
  const [readOnly, setReadOnly] = useState(true);
  const [date, setDate] = useState(new Date(task.date));
  const [slot, setSlot] = useState(new Date(task.time));
  const [basket, setBasket] = useState(task.basket);

  // console.log(typeof basket);
  // do tmr - change this to class and implement date and time
  // getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.task.date != prevState.task.date) {}
  // }
  // need readonly for each request -- do tmr!
  const onSubmit = (data) => {
    // do axios call;
    //TODO!
    console.log(data);
    if (!readOnly) {
      setReadOnly(!readOnly);
    }

    props.onHide();
  };

  const changeDetails = (e) => {
    setReadOnly(!readOnly);
    e.preventDefault();
  };

  const closeModal = () => {
    props.onHide();
  };

  return (
    <Modal {...props} size='lg' aria-abelledby='details-modal' centered>
      <Modal.Header>
        <Modal.Title aria-labelledby='details-modal'>
          Edit Details of Request
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <h6>Details of service</h6>
          <Form.Group>
            <Form.Label>Date:</Form.Label>
            {readOnly ? (
              <Form.Control
                readOnly={readOnly}
                placeholder={formatDate(task.date)}
              />
            ) : (
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                showDisabledMonthNavigation
                withPortal
              />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Time:</Form.Label>
            {readOnly ? (
              <Form.Control
                readOnly={readOnly}
                placeholder={formatTime(task.time)}
              />
            ) : (
              <DatePicker
                selected={slot}
                onChange={(time) => setSlot(time)}
                showTimeSelect
                showTimeSelectOnly
                minTime={setHours(setMinutes(new Date(), 30), 8)}
                maxTime={setHours(setMinutes(new Date(), 30), 17)}
                timeIntervals={15}
                timeCaption='Time'
                dateFormat='h:mm aa'
                withPortal
              />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>TaskId:</Form.Label>
            <Form.Control readOnly defaultValue={task.taskId} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category:</Form.Label>
            <Form.Control readOnly defaultValue={task.category} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Store:</Form.Label>
            <Form.Control
              as='select'
              ref={register({
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              readOnly={readOnly}
              defaultValue={task.store}
              name='store'
            >
              <option value={""} disabled selected>
                Select your Store:
              </option>
              {stores.sort().map((store) => (
                <option value={store}>{store}</option>
              ))}
            </Form.Control>
            {errors.store && <Form.Text>{errors.store.message}</Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Your Purchased Items:</Form.Label>
            <Form.Control
              readOnly={readOnly}
              placeholder={basket}
            ></Form.Control>
            {/* <Basket basket={basket} setBasket={setBasket} /> */}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className='text-center'>
          <ButtonToolbar>
            {readOnly ? (
              <Button onClick={(e) => changeDetails(e)}>Click to Change</Button>
            ) : (
              <Button variant='success' type='submit'>
                Submit
              </Button>
            )}
            <Button variant='secondary' onClick={closeModal}>
              Close
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditDetailsModal;
