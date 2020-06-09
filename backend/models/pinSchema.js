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
  address: {
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
  },
  niNo: {
    required: true,
    type: String,
  },
});

const Pin = mongoose.model("pin", PinSchema);

modules.export = Pin;
