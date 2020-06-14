import React from "react";
import { Card, Button, Modal, Table, Form } from "react-bootstrap";

const ViewOnlyBasket = (props) => {
  var basket = props.basket;
  var checkBox = props.check;
  console.log(props);

  try {
    if (typeof basket === "string") {
      basket = JSON.parse(props.basket);
    }

  } catch (err) {
    // console.error(err);
  }

  const capitalise = (str) => {
    var firstLetter = str.slice(0, 1);
    return firstLetter.toUpperCase() + str.slice(1);
  }

  if (props.category == 'Grocery') {
    return (
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {basket.map((element, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{capitalise(element.item)}</td>
                <td>{element.quantity}</td>
                <td>{element.unit == "" ? "pc(s)" : element.unit}</td>
                {checkBox ? (
                  <td>
                    <Form.Group controlId={"checkbox" + i}>
                      <Form.Check type='checkbox' />
                    </Form.Group>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  } else if (props.category == 'Laundry') {
    return (
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Item</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {basket.map((element, i) => {
            console.log(i + " " + typeof(element.amt))
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{capitalise(element.type)}</td>
                <td>{(element.amt == null || element.amt == "") ? 0 : element.amt}</td>
                {checkBox ? (
                  <td>
                    <Form.Group controlId={"checkbox" + i}>
                      <Form.Check type='checkbox' />
                    </Form.Group>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  } else {
    return <h4>Error loading basket</h4>;
  } 
};

export default ViewOnlyBasket;
