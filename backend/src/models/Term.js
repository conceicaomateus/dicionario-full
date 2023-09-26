const mongoose = require("mongoose");

const Term = mongoose.model("Term", {
  title: String,
  description: String,
  examples: Array,
});

module.exports = Term;
