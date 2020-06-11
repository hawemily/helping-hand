import React from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      idToken: localStorage.getItem('id_token'),
      userType: localStorage.getItem("user_type"),
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      firstAddress: '',
      streetName: '',
      postCode: '',
      password: '',
      passwordLength: 0,
      dirty: false,
      passwordDirty: false,
    }
    this.editResult = '';
  }

  componentWillMount() {
    if (this.state.idToken != null) {
      axios.get("/" + this.state.userType + "s/" + this.state.idToken)
      .then((res) => {
        if (res.data.success) {
          this.setState(res.data[this.state.userType]);
          this.makePlaceholderPassword();
        }
      })
      .catch(err => console.error(err));
    }
  }

  setFirstName = (e) => {
    this.state.dirty = true;
    this.setState({firstName: e.target.value});
  }

  setLastName = (e) => {
    this.state.dirty = true;
    this.setState({lastName: e.target.value});
  }

  setEmail = (e) => {
    this.state.dirty = true;
    this.setState({email: e.target.value});
  }

  setPhoneNumber = (e) => {
    this.state.dirty = true;
    this.setState({phoneNumber: e.target.value});
  }

  setFirstAddress = (e) => {
    this.state.dirty = true;
    this.setState({firstAddress: e.target.value});
  }

  setStreetName = (e) => {
    this.state.dirty = true;
    this.setState({streetName: e.target.value});
  }

  setPostCode = (e) => {
    this.state.dirty = true;
    this.setState({postCode: e.target.value});
  }

  setPassword = (e) => {
    this.state.passwordDirty = true;
    this.setState({password: e.target.value});
  }

  makePlaceholderPassword = () => {
    this.state.password = '' + Math.pow(10, this.state.passwordLength - 1);
  }

  edit = (e) => {
    e.preventDefault();
    var state = this.state;
    var resultMsg = document.getElementById('result-msg');
    var item =  {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phoneNumber: state.phoneNumber
    }

    if (state.passwordDirty) {
      item.password = state.password;
    }

    this.setState({dirty: false, passwordDirty: false});

    axios.post("/" + this.state.userType + "/edit/" + this.state.idToken, item)
    .then((result) => {
      if (result.data.success) {
        this.editResult = 'Edit successful!';
      } else {
        this.editResult = 'Something went wrong. Please try again.';
        document.getElementById("editBtn").disabled = true;
        resultMsg.classList.add('error');
      }
      resultMsg.innerText = this.editResult;
      resultMsg.classList.add('show');
    })
  
  }

  render() {
    return (
      <Modal onHide={this.props.close} show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>My Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={(e) => this.edit(e)}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control value={this.state.firstName} placeholder="First Name" onChange={e => this.setFirstName(e)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control value={this.state.lastName} placeholder="Last Name" onChange={e => this.setLastName(e)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control value={this.state.email} type="email" placeholder="Enter email" onChange={e => this.setEmail(e)} />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control value={this.state.password} type="password" placeholder="Password" onChange={e => this.setPassword(e)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control value={this.state.phoneNumber} placeholder="Contact Number" onChange={e => this.setPhoneNumber(e)} />
          </Form.Group>

          {this.state.userType == 'pin' ?
            <Form.Group>
              <Form.Label>First Line of Address</Form.Label>
              <Form.Control value={this.state.firstAddress} placeholder="First Line of Address" onChange={e => this.setFirstAddress(e)} />
            </Form.Group> : <div /> 
          }

          {this.state.userType == 'pin' ?
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control value={this.state.streetName} placeholder="Street" onChange={e => this.setStreetName(e)} />
            </Form.Group> : <div /> 
          }

          {this.state.userType == 'pin' ?
            <Form.Group>
              <Form.Label>Postcode</Form.Label>
              <Form.Control value={this.state.postCode} placeholder="Postcode" onChange={e => this.setPostCode(e)} />
            </Form.Group> : <div /> 
          }

          <Form.Group id="result-msg">
            <Form.Text>{this.editResult}</Form.Text>
          </Form.Group>

          <Button disabled={!this.state.dirty && !this.state.passwordDirty} variant="primary" type="submit" className="submitBtn" id="editBtn">
            Edit
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default Account;