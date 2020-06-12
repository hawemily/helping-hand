import React from "react";
import AddressItem from "./AddressItem";

const AddressSuggest = (props) => {
  return (
    <AddressItem
      label='Address'
      value={this.props.query}
      placeholder='Type in your address'
    />
  );
};

export default AddressSuggest;
