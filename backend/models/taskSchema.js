const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  pinId: {
    type: String,
    required: true
  },
  volunteerId: {
    type: String,
    required: true
  },
});

var Task = mongoose.model("task", TaskSchema);

module.exports = Task;
