import React, { useState } from "react";
import { Modal, ButtonToolbar, Form, Button, Table } from "react-bootstrap";
import { setHours, setMinutes } from "date-fns";
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
  const [readOnly, setReadOnly] = useState(true);
  const [store, setStore] = useState(task.store);
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

    axios
      .post("/services/updateGroceries", {
        basket: basket,
        date: date,
        time: slot,
        store: store,
        taskId: task._id,
      })
      .then((res) => {
        alert("HIII");

        if (res.data.success) {
          console.log("successful axios post");
          console.log(res.data);
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
            </Form.Control>
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
