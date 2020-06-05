const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  taskId: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  basket: {
    type: String,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
  // for options such as allowing substitutions for groceries
  optionOne: {
    type: Boolean,
    default: false,
  },
});

module.exports = Service = mongoose.model("service", ServiceSchema);