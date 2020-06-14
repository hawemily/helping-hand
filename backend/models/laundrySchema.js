const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaundrySchema = new Schema({

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
    default: false,
  },
});

module.exports = Laundry = mongoose.model("Laundry", LaundrySchema);
