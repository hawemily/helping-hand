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
  requests: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

var Pin = mongoose.model("pin", PinSchema);

module.exports = Pin;
