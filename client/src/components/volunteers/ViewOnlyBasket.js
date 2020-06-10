import React from 'react';
import { Card, Button, Modal, Table, Form } from "react-bootstrap";

const ViewOnlyBasket = (props) => {
  var basket = [];
  try {
    basket = JSON.parse(props.basket);
  } catch(err) {
    console.error(err);    
  }

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
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{element.item}</td>
              <td>{element.quantity}</td>
              <td>
                <Form.Group controlId={"checkbox" + i}>
                  <Form.Check type="checkbox" />
                </Form.Group>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ViewOnlyBasket;