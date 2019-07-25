const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  content: String,
  email: {
    type: String,
    select: false
  }
});

module.exports = itemSchema;
