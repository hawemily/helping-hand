import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

const AddItem = (props) => {
  const [item, setItem] = useState("");
  return (
    <Container className='border border-dark'>
      <Form className='mb-3 mt-3'>
        {["Item", "Quantity"].map((legend) => (
          <Form.Group controlId={`formGroup${legend}`}>
            <Form.Label>{legend}:</Form.Label>
            <Form.Control
              type='text'
              placeholder={`Enter ${legend}`}
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </Form.Group>
        ))}
        <Button variant='success'>Add Item</Button>
      </Form>
    </Container>
  );
};

export default AddItem;
