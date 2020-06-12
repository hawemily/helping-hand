import React from "react";
import AddressSuggest from "./AddressSuggest";
import AddressInput from "./AddressInput";

const AddressForm = () => {
  const [address, setAddress] = useState("");

  return (
    <>
      <AddressSuggest />
      <AddressInput firstLine='' secondLine='' town='' postcode='' country='' />
    </>
  );
};
