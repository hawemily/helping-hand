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

    console.log(checkBox);
  } catch (err) {
    // console.error(err);
  }

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
              <td>{element.item == null ? element.type : element.item}</td>
              <td>{element.quantity == null ? element.amt : element.quantity}</td>
              <td>{element.unit}</td>
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
};

export default ViewOnlyBasket;
