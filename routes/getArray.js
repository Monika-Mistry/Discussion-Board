const express = require("express");
const router = express.Router();

const array = require("./array");

// @route GET getArray/ 
// @desc Get the stored array
// @access Public
router.get("/", (req, res) => {
    res.send(array.arr);
});

module.exports = router;