const express = require("express");
const router = express.Router();
const toArray = require('object-values-to-array');
const item = require("../models/itemModel.js");

let arr = [];

// @route POST item/addItem 
// @desc Create an array from JSON
// @access Public
router.post("/addItem", (req, res) => {
    const newItem = new item({
        username: req.body.username,
        content: req.body.content
    });
    newItem.save()
        .then(() => {
            res.send("Added Item");
        })
        .catch(err => res.status(404).json(err));

});

// @route GET item/getItems 
// @desc Get the stored array
// @access Public
router.get("/getItems", (req, res) => {
    const errors = {};
    item.find()
        .then(items => {
            if (!items) {
                errors.noItems = "There are no items";
                res.status(404).json(errors);
            }
            res.json(items);
        })
        .catch(err => res.status(404).json(err));
});


// @route PUT item/updateItem
// @desc Update item in the array
// @access Public
router.put("/updateItem", (req, res) => {
    item.updateOne({ '_id': req.body._id }, { $set: { 'username': req.body.username, 'content': req.body.content } })
        .then(() => {
            res.send("Updated Item")
        })
        .catch(err => res.status(404).json(err));
});

// @route DELETE item/deleteItem 
// @desc Delete item in the array
// @access Public
router.delete("/deleteItem", (req, res) => {
    const errors = {};
    let search = { '_id': req.body._id };
    item.findOneAndDelete(search)
        .then(items => {
            if (!items) {
                errors.noItems = "There are no items";
                res.status(404).json(errors);
            }
            res.send('Removed Item');
        })
        .catch(err => res.status(404).json(err));
});

// @route GET item/test 
// @desc test model
// @access Public
router.get("/test", (req, res) => {
    const errors = {};
    item.find()
        .then(items => {
            res.json(items);
        })
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

module.exports = router;