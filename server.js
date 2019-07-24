const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const item = require("./routes/item");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/item", item);

//connect to database
mongoose.connect('mongodb://localhost:27017/example',
    { useNewUrlParser: true }
).then(
    () => { console.log("Connection Successful") },
    err => { console.log(err.message) });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));