import React, { useState } from "react";
import { Table, Container, Form, Button } from "react-bootstrap";

const EditBasket = (props) => {
  const units = [
    "Kg",
    "g",
    "litre",
    "ml",
    "pints",
    "packet",
    "bag",
    "roll",
    "unit",
    "units",
    "bottle",
    "can",
    "bunch",
  ];

  const deleteItem = (id) => {
    console.log(id);
    props.setBasket(props.basket.filter((el, value) => value !== id));
  };

  const setBasketItem = (v, index, header) => {
    const updatedBasket = basket.map((item, id) => {
      if (id === index) {
        const updatedItem = { ...item, [header]: v };
        console.log(updatedItem);
        return updatedItem;
      }
      return item;
    });
    props.setBasket(updatedBasket);
  };

  const basket = props.basket;

  return (
    <Container className='border'>
      <h4 style={{ marginTop: "10px" }}>Grocery Basket:</h4>
      <Table bordered hover>
        <thead>
          <tr>
            <th style={{ width: "50px" }}></th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {basket.map((e, i) => (
            <tr>
              <td>
                <Button variant='danger' onClick={() => deleteItem(i)}>
                  &times;
                </Button>
              </td>
              <td>
                <Form.Control
                  type='text'
                  placeholder={e.item}
                  value={basket[i].item}
                  onChange={(e) => setBasketItem(e.target.value, i, "item")}
                ></Form.Control>
              </td>
              <td>
                <Form.Control
                  type='number'
                  placeholder={e.quantity}
                  value={basket[i].quantity}
                  onChange={(e) => setBasketItem(e.target.value, i, "quantity")}
                ></Form.Control>
              </td>
              <td>
                <Form.Control
                  as='select'
                  placeholder={e.unit}
                  value={basket[i].unit}
                  onChange={(e) => setBasketItem(e.target.value, i, "unit")}
                >
                  <option value='' selected>
                    Units
                  </option>
                  {units.map((unit) => (
                    <option>{unit}</option>
                  ))}
                </Form.Control>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EditBasket;
