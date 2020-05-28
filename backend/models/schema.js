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

module.exports = Contact = mongoose.model("contact", ContactSchema);
