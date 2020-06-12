import React from "react";
import AddressItem from "./AddressItem";

const AddressInput = (props) => {
  const inputs = [
    { label: "Address Line 1", value: props.firstLine },
    { label: "Address Line 2", value: props.secondLine },
    { label: "Town/City", value: props.town },
    { label: "Postcode", value: props.postcode },
    { label: "Country", value: props.country },
  ];
  return (
    <>
      {inputs.map((input) => (
        <AddressItem
          label={input.label}
          value={input.value}
          placeHolder=''
          readOnly
        />
      ))}
    </>
  );
};

export default AddressInput;
