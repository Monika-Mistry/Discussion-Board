const express = require("express");
const router = express.Router();
const toArray = require( 'object-values-to-array' );

let arr = [];

// @route POST item/create 
// @desc Create an array from JSON
// @access Public
router.post("/create", (req, res) => {
    arr = toArray(req.body);
    res.send("Array created");
});

// @route GET item/getItems 
// @desc Get the stored array
// @access Public
router.get("/getItems", (req, res) => {
    res.send(arr);
});

// @route PUT item/addItem 
// @desc Add item to the array
// @access Public
router.put("/addItem", (req, res) => {
    arr = arr.concat(toArray(req.body));
    res.send(arr);
});

// @route PUT item/updateItem
// @desc Update first item in the array
// @access Public
router.put("/updateItem", (req, res) => {
    arr[0] = toArray(req.body)[0];
    res.send(arr);
});

// @route DELETE item/deleteItem 
// @desc Delete first item in the array
// @access Public
router.delete("/deleteItem", (req, res) => {
    arr.shift()
    res.send(arr);
});

module.exports = router;