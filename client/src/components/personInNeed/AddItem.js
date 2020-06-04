import React, { useState, useRef, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddItem = (props) => {
  const { register, handleSubmit, errors } = useForm();
  // useEffect(() => {
  //   console.log("ERR", errors);

  //   alert(errors.message);
  // });

  const onSubmit = (data) => {
    console.log(`item: ${data.Item}, quantity: ${data.Quantity}`);
    props.setBasket(
      props.basket.concat({ item: data.Item, quantity: data.Quantity })
    );
  };

  const legends = [
    {
      name: "Item",
      pattern: /^[A-Za-z]+$/,
      regexMessage: "This field can only accept alphabets",
    },
    {
      name: "Quantity",
      pattern: /^[1-9][0-9]*$/,
      regexMessage: "This field cannot be 0",
    },
  ];

  return (
    <Container className='border border-dark'>
      <Form className='mb-3 mt-3' onSubmit={handleSubmit(onSubmit)}>
        {legends.map((legend) => {
          const name = legend.name;
          return (
            <Form.Group controlId={`formGroup${name}`}>
              <Form.Label>{name}:</Form.Label>
              <Form.Control
                type='text'
                placeholder={`Enter ${name}`}
                name={name}
                ref={register({
                  required: true,
                  pattern: legend.pattern,
                })}
              />
              {errors[name] && errors[name].type === "required" && (
                <p>{`${name} is required`}</p>
              )}
              {errors[name] && errors[name].type === "pattern" && (
                <p>{legend.regexMessage}</p>
              )}
            </Form.Group>
          );
        })}
        <Button variant='success' type='submit'>
          Add Item
        </Button>
      </Form>
    </Container>
  );
};

export default AddItem;
