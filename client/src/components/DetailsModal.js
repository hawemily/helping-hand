import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import ViewOnlyBasket from "./volunteers/ViewOnlyBasket";

class DetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPin: false,
      pinInfo: {},
      taskId: "",
    };
  }

  componentWillMount() {
    console.log(this.props);
    if (localStorage.getItem("user_type") == "volunteer") {
      // For Volunteers
      const { pin, taskId } = this.props;

      axios.get("/pins/" + pin).then((res) => {
        if (res.data.success) {
          this.setState({
            pinInfo: res.data.pin,
          });
        }
      });

      this.setState({ taskId: taskId });
      // const { firstName, lastName, email, phoneNumber, address } = pinInfo;
    }
  }

  render() {
    const pin = this.state.pinInfo;
    const props = this.props;

    if (localStorage.getItem("user_type") == "volunteer") {
      return (
        <div id={this.state.taskId}>
          <Modal
            {...props}
            size='lg'
            aria-labelledby={props.ariaLabelledBy}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id={props.ariaLabelledBy}>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <h4>{category}</h4> */}
              <ViewOnlyBasket check='true' basket={props.basket} />
              <br />
              <h4>Person You Will Help</h4>
              <Table>
                <tr>
                  <td>Name</td>
                  <td>
                    {pin.firstName} {pin.lastName}
                  </td>
                </tr>
                <tr>
                  <td>Email Address</td>
                  <td>{pin.email}</td>
                </tr>
                <tr>
                  <td>Contact Number</td>
                  <td>{pin.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>
                    {pin.firstAddress +
                      ", " +
                      pin.streetName +
                      " " +
                      pin.postCode}
                  </td>
                </tr>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else {
      // For PINs
      const { category, taskId, basket, volunteerId } = props.task;

      return (
        <div id={taskId}>
          <Modal
            {...props}
            size='lg'
            aria-labelledby={props.ariaLabelledBy}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id={props.ariaLabelledBy}>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{category}</h4>
              {/* use another thingy cus ViewOnlyBasket doesnt allow edits cus i made it only with volunteers in mind or u can modify it */}
              <ViewOnlyBasket check='true' basket={basket} />
              <br />
              <h4>Your Volunteer</h4>
              <p>{volunteerId}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
}

export default DetailsModal;
