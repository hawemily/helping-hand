const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaundrySchema = new Schema({
  taskId: {
    type: String,
    required: true,
  },
  dropOffDate: {
    type: Date,
    required: true,
  },
  dropOffTime: {
    type: Date,
    required: true,
  },
  load: {
    type: String,
    required: true,
  },
  basket: {
    type: Object,
    required: true,
  },
  detergent: {
    type: Boolean,
    required: true,
  },
});

module.exports = Laundry = mongoose.model("Laundry", LaundrySchema);
