const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: 0,
  },
  jobType: {
    type: String,
    default: "",
  },
});

const Contact = mongoose.model("contact", ContactSchema);

const TaskSchema = new Schema({
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


module.exports = {
  Contact: Contact,
  Task: Task,
}