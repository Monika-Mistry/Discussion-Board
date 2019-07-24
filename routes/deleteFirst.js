const express = require("express");
const router = express.Router();

const array = require("./array");

// @route DELETE deleteFirst/delete 
// @desc Delete first item in the array
// @access Public
router.delete("/delete", (req, res) => {
    let arr = array.arr
    arr.shift()
    res.send(arr);
});

module.exports = router;