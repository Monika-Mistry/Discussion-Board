const express = require("express");
const bodyParser = require("body-parser");

const array = require("./routes/array");
const getArray = require("./routes/getArray");
const addToArray = require("./routes/addToArray");
const updateFirst = require("./routes/updateFirst");
const deleteFirst = require("./routes/deleteFirst");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/array", array);
app.use("/getArray", getArray);
app.use("/addToArray", addToArray);
app.use("/updateFirst", updateFirst);
app.use("/deleteFirst", deleteFirst);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));