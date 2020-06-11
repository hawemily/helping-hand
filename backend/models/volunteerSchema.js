const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema

const VolunteerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Volunteer = mongoose.model("volunteer", VolunteerSchema);

module.exports = Volunteer;
