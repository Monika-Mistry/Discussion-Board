const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    username: String,
    content: {
        type: String,
        required: true
    }
});

module.exports = itemSchema;