const express = require("express");
const router = express.Router();
const toArray = require( 'object-values-to-array' );

const array = require("./array");

// @route PUT addToarray/addItem 
// @desc Add item to the array
// @access Public
router.put("/addItem", (req, res) => {
    let arr = array.arr.concat(toArray(req.body));
    res.send(arr);
});

module.exports = router;