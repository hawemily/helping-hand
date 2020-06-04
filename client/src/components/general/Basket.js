import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const Basket = (props) => {
  const deleteItem = (id) => {
    console.log(id);
    props.setBasket(props.basket.filter((el, value) => value != id));
  };
  return (
    <Container>
      <Table bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {props.basket.map((e, value) => (
            <tr>
              <td>
                <Button variant='danger' onClick={() => deleteItem(value)}>
                  &times;
                </Button>
              </td>
              <td>{e.item}</td>
              <td>{e.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Basket;
