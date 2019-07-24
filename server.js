const express = require("express");
const bodyParser = require("body-parser");

const item = require("./routes/item");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/item", item);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));