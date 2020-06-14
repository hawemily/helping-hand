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

  const capitalise = (str) => {
    var firstLetter = str.slice(0, 1);
    return firstLetter.toUpperCase() + str.slice(1);
  }

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

  function numOfItems(e) {
    if (e.quantity == null) {
      if (e.amt == null || e.amt == "") {
        return '0';
      } else {
        return e.amt;
      }
    } else {
      return e.quantity;
    }
  }

  function itemName(e) {
    return e.item == null ? capitalise(e.type) : capitalise(e.item);
  }


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
                  placeholder={itemName(e)}
                  value={basket[i].item}
                  onChange={(e) => setBasketItem(e.target.value, i, "item")}
                ></Form.Control>
              </td>
              <td>
                <Form.Control
                  type='number'
                  placeholder={numOfItems(e)}
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
