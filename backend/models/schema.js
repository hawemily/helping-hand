const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    default: 0,
  },
});

module.exports = Contact = mongoose.model("contact", ContactSchema);
