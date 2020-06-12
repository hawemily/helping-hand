import React from "react";
import { Form } from "react-bootstrap";

const AddressItem = (props) => {
  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type='text'
        defaultValue={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
      ></Form.Control>
    </Form.Group>
  );
};

export default AddressItem;
