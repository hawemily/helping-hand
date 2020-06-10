import React from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InformationTooltip from "./moreInfo";

const AddItem = (props) => {
  const { register, handleSubmit, errors, reset } = useForm();
  // useEffect(() => {
  //   console.log("ERR", errors);

  //   alert(errors.message);
  // });

  const onSubmit = (data) => {
    console.log(
      `item: ${data.Item}, quantity: ${data.Quantity}, units:${data.Units}`
    );
    props.setBasket(
      props.basket.concat({
        item: data.Item,
        quantity: data.Quantity,
        unit: data.Units,
      })
    );
    reset();
  };

  const legends = [
    {
      name: "Item",
      placeholder: "Enter your purchase item",
      tooltip:
        "Input an item that you need. Be as specific as possible to help your shopper!",
      pattern: /^[A-Za-z ]+$/,
      regexMessage: "This field can only accept alphabets",
      type: "text",
    },
    {
      name: "Quantity",
      placeholder: "Enter your quantity",
      tooltip: "Input the amount that you need (only numbers are allowed)",
      pattern: /^[1-9][0-9]*$/,
      regexMessage: "This field cannot be 0, and can only contain numbers",
      type: "number",
      min: "1",
    },
  ];

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

  return (
    <Form className='mb-3 mt-3' onSubmit={handleSubmit(onSubmit)}>
      {legends.map((legend) => {
        const name = legend.name;
        return (
          <Form.Group controlId={`formGroup${name}`}>
            <Form.Row>
              <Form.Label>{name}:</Form.Label>
              <InformationTooltip message={legend.tooltip} />
            </Form.Row>
            <Form.Control
              type={legend.type}
              min={legend.min}
              placeholder={legend.placeholder}
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
      <Form.Group>
        <Form.Label>Unit:</Form.Label>
        <Form.Control
          as='select'
          placeholder='Enter Units'
          name='Units'
          ref={register()}
          defaultValue='Units'
        >
          <option value='' selected>
            Units
          </option>
          {units.map((unit) => (
            <option>{unit}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Container className='text-center'>
        <Row>
          <Col>
            <Button variant='success' type='submit'>
              Add Item
            </Button>
          </Col>
          <Col>
            <Button variant='danger' onClick={reset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default AddItem;
