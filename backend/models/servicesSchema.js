const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PinServicesSchema = new Schema({
  taskID: {
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
  category: {
    type: String,
    default: "",
    required: true,
  },
  basket: {
    type: String,
    required: true,
  },

  // for options such as allowing substitutions for groceries
  optionOne: {
    type: Boolean,
    default: false,
  },
});
