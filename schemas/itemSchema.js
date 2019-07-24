const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    content: String
});

const item = mongoose.model('Item', itemSchema);
module.exports = itemSchema;
//module.exports = item;