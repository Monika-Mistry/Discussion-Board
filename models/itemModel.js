const mongoose = require("mongoose");

const itemSchema = require("../schemas/itemSchema");

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
