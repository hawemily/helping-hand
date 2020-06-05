import React from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";

const Basket = (props) => {
  const deleteItem = (id) => {
    console.log(id);
    props.setBasket(props.basket.filter((el, value) => value != id));
  };
  return (
    <Container>
      <Container className='text-centre'>
        <Row>
          <Col>
            <h6>Groceries Basket</h6>
          </Col>
        </Row>
      </Container>

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
