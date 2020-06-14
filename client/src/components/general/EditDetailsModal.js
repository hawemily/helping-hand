import React, { useState } from "react";
import { Modal, ButtonToolbar, Form, Button, Table } from "react-bootstrap";
import { setHours, setMinutes, addDays } from "date-fns";
import DatePicker from "react-datepicker";
import { formatTime, formatDate } from "./dateTimeFormatter";
import EditBasket from "./EditBasket";
import ViewOnlyBasket from "../volunteers/ViewOnlyBasket";
import axios from "axios";

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
  const category = task.category;
  const [readOnly, setReadOnly] = useState(true);
  const [store, setStore] = useState(task.store);
  const [load, setLoad] = useState(task.load);
  const [dropOffDate, setDropOffDate] = useState(new Date(task.dropOffDate));
  const [dropOffTime, setDropOffTime] = useState(new Date(task.dropOffTime));
  const [date, setDate] = useState(new Date(task.date));
  const [slot, setSlot] = useState(new Date(task.time));
  var taskBasket;
  try {
    taskBasket = JSON.parse(task.basket);
  } catch (err) {
    taskBasket = task.basket;
  }
  const [basket, setBasket] = useState(taskBasket);

  // console.log(typeof basket);
  // do tmr - change this to class and implement date and time
  // getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.task.date != prevState.task.date) {}
  // }
  // need readonly for each request -- do tmr!
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(task);

    axios
      .post("/services/updateGroceries", {
        basket: basket,
        date: date,
        time: slot,
        store: store,
        taskId: task.taskId,
      })
      .then((res) => {
        if (res.data.success) {
          console.log("successful axios post");
        } else {
          console.log(res.data.err);
        }
      })
      .catch((err) => {
        console.log("Could not submit post request");
        console.log(err);
      });

    if (!readOnly) {
      setReadOnly(!readOnly);
    }
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
          Details of Request
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
            <div>
                <p style={{width: "fit-content", display: "inline-block", marginRight: "3rem"}}>Request No.</p>
                <p style={{width: "fit-content", display: "inline-block"}}>{task.taskId}</p>
            </div>
          <Form.Group>
            {category == 'Grocery' ? (<Form.Label>Date:</Form.Label>) :
                (<Form.Label>Date of PickUp:</Form.Label>)}
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
            {category == 'Grocery' ? (<Form.Label>Time:</Form.Label>) :
                (<Form.Label>Time of PickUp:</Form.Label>)}
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
          {category == 'Laundry' ?
              (<Form.Group>
                <Form.Label>Date of DropOff:</Form.Label>
                {readOnly ? (
                    <Form.Control
                        readOnly={readOnly}
                        placeholder={formatDate(task.dropOffDate)}
                    />
                ) : (
                    <DatePicker
                        selected={dropOffDate}
                        onChange={(dropOffDate) => setDropOffDate(dropOffDate)}
                        minDate={addDays(date, 1)}
                        maxDate={addDays(date, 5)}
                        showDisabledMonthNavigation
                        withPortal
                    />
                )}
              </Form.Group>) :
              (<div></div>)}
          {category == 'Laundry' ?
              (<Form.Group>
                <Form.Label>Time of DropOff:</Form.Label>
                {readOnly ? (
                    <Form.Control
                        readOnly={readOnly}
                        placeholder={formatTime(task.dropOffTime)}
                    />
                ) : (
                    <DatePicker
                        selected={dropOffTime}
                        onChange={(dropOffTime) => setDropOffTime(dropOffTime)}
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
              </Form.Group>) :
              (<div></div>)}
          {/* <Form.Group>
            <Form.Label>TaskId:</Form.Label>
            <Form.Control readOnly defaultValue={task.taskId} />
          </Form.Group> */}
          <Form.Group>
            <Form.Label>Category:</Form.Label>
            <Form.Control readOnly defaultValue={task.category} />
          </Form.Group>
          <Form.Group>
            {category == 'Grocery' ?
                (<Form.Label>Store:</Form.Label>) :
                (<Form.Label> Loads:</Form.Label>)}
            {category == 'Grocery' ?
                (<Form.Control
                    as='select'
                    onChange={(e) => setStore(e.target.value)}
                    disabled={readOnly}
                    defaultValue={task.store}
                    name='store'
                >
                  <option value={""} disabled selected>
                    Select your Store:
                  </option>
                  {stores.sort().map((store) => (
                      <option value={store}>{store}</option>
                  ))}
                </Form.Control>) :
                (<Form.Control
                    type='number'
                    name='load'
                    onChange={(e) => setLoad(e.target.value)}
                    defaultValue={task.load}
                    disabled={readOnly}
                    min='1'
                    max='5'
                />)}
          </Form.Group>
          <Form.Group>
            <Form.Label>Your Purchased Items:</Form.Label>
            {readOnly ? (
              <ViewOnlyBasket basket={basket} category={task.category} checkBox={false} />
            ) : (
              <EditBasket basket={basket} setBasket={setBasket} />
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className='text-center'>
          <ButtonToolbar>
            {readOnly ? (
              <Button disabled={task.status == 'complete'} onClick={(e) => changeDetails(e)}>Click to Edit</Button>
            ) : (
              <Button variant='success' onClick={(e) => onSubmit(e)}>
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
