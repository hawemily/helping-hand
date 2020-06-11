const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrocerySchema = new Schema({
  basket: {
    type: Object,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
  // for options such as allowing substitutions for groceries
  subs: {
    type: Boolean,
    default: false,
  },
});

module.exports = Grocery = mongoose.model("Grocery", GrocerySchema);
