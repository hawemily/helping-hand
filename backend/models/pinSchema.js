const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  firstAddress: {
    required: true,
    type: String,
  },
  streetName: {
    required: true,
    type: String,
  },
  postCode: {
    required: true,
    type: String,
  },
  phoneNumber: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  niNo: {
    required: true,
    type: String,
  },
});

var Pin = mongoose.model("pin", PinSchema);

module.exports = Pin;
