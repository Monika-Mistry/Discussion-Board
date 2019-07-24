const express = require("express");
const toArray = require( 'object-values-to-array' );
const router = express.Router();

// @route POST array/create 
// @desc Create an array from JSON
// @access Public
router.post("/create", (req, res) => {
    module.exports.arr = toArray(req.body);
    res.send("Array created");
});

module.exports = router;