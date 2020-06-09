import React from 'react';
import { Card, Button, Modal, Table } from "react-bootstrap";

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
        </tr>
      </thead>
      <tbody>
        {basket.map((element, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{element.item}</td>
              <td>{element.quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ViewOnlyBasket;