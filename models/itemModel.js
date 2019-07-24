const mongoose = require("mongoose");

const itemSchema = require("../schemas/itemSchema");

const item = mongoose.model('items', itemSchema);

module.exports = item;