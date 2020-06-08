import React from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

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
      pattern: /^[A-Za-z ]+$/,
      regexMessage: "This field can only accept alphabets",
      type: "text",
    },
    {
      name: "Quantity",
      pattern: /^[1-9][0-9]*$/,
      regexMessage: "This field cannot be 0, and can only contain numbers",
      type: "number",
      min: "1",
    },
  ];

  const units = ["kg", "pints", "grams", "litres"];

  return (
    <Form className='mb-3 mt-3' onSubmit={handleSubmit(onSubmit)}>
      {legends.map((legend) => {
        const name = legend.name;
        return (
          <Form.Group controlId={`formGroup${name}`}>
            <Form.Label>{name}:</Form.Label>
            <Form.Control
              type={legend.type}
              min={legend.min}
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
