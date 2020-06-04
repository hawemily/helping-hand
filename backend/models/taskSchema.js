const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  pinId: {
    type: String,
    required: true,
  },
  volunteerId: {
    type: String,
    required: true
  },
  description: {
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
  }
})

var Task = mongoose.model("task", TaskSchema);

module.exports = Task;