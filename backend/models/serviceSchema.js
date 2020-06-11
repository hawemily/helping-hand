const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceSchema = new Schema({
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
    enum: ["Laundry", "Grocery"],
  },
  details: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "category",
  },
});

module.exports = Service = mongoose.model("service", ServiceSchema);
