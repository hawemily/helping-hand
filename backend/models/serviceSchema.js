// HI STOPID MOFOS each service contains the details of one task
//naming is a bij
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  taskId: {
    type: String,
    required: true,
  },
  area: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
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
