import React, { useState } from "react";
import { Table } from "react-bootstrap";

const EditBasket = (props) => {
  // const table = {<Form.Control
  //     ref={register({
  //       required: {
  //         value: true,
  //         message: "This field is required",
  //       },
  //     })}
  //     readOnly={readOnly}
  //     defaultValue={task.basket}
  //     name='basket'
  //   />
  //   {errors.basket && <Form.Text>{errors.basket.message}</Form.Text>}}
  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Item</th>
            <th>Unit</th>
            <th></th>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default EditBasket;
