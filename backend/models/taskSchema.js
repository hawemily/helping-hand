const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskID: {
    type: String,
    required: true,
  },

  pinId: {
    type: String,
  },
  volunteerId: {
    type: String,
  },
});

var Task = mongoose.model("task", TaskSchema);

module.exports = Task;
