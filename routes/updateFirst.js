const express = require("express");
const router = express.Router();
const toArray = require( 'object-values-to-array' );

const array = require("./array");

// @route PUT updateFirst/update 
// @desc Update first item in the array
// @access Public
router.put("/update", (req, res) => {
    let arr = array.arr;
    arr[0] = toArray(req.body)[0];
    res.send(arr);
});

module.exports = router;