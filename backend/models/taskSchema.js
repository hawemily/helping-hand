// this is the schema that links each task to the requester
// and the volunteer
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  pinId: {
    type: String,
    required: true,
  },
  volunteerId: {
    type: String,
  },
  status: {
    type: String,
    default: "pending"
  },
});

var Task = mongoose.model("task", TaskSchema);

module.exports = Task;
