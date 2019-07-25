const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const item = require("../models/itemModel.js");
const validateItemInput = require("../validation/itemValidation");
//const hash = require("../encryption/hash");

// @route POST item/addItem
// @desc Create an array from JSON
// @access Public
router.post("/addItem", (req, res) => {
  const validate = validateItemInput(req.body);

  if (!validate.isValid) {
    return res.status(400).json(validate.errors);
  }
  const newItem = new item({
    username: req.body.username,
    content: req.body.content,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newItem.email, salt, (err, hash) => {
      if (err) {
        res.json(err);
      } else {
        newItem.email = hash;
        newItem
          .save()
          .then(() => {
            res.send("Added Item");
          })
          .catch(err => res.status(404).json(err));
      }
    });
  });
});

// @route GET item/getAll
// @desc Get the stored array
// @access Public
router.get("/getAll", (req, res) => {
  const errors = {};
  item
    .find()
    .then(items => {
      if (!items) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      }
      res.json(items);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET item/username
// @desc Get the items with the given username
// @access Public
router.get("/username", (req, res) => {
  const errors = {};
  item
    .find(req.body)
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
  const updatedItem = {
    username: req.body.username,
    content: req.body.content,
    email: req.body.email
  };

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(updatedItem.email, salt, (err, hash) => {
      if (err) throw err;
      updatedItem.email = hash;
      item
        .updateOne(
          { _id: req.body._id },
          {
            $set: updatedItem
          }
        )
        .then(() => {
          res.send("Updated Item");
        })
        .catch(err => res.status(404).json(err));
    });
  });
});

// @route DELETE item/deleteItem
// @desc Delete item in the array
// @access Public
router.delete("/deleteItem", (req, res) => {
  const errors = {};
  let search = { _id: req.body._id };
  let email = req.body.email;
  item.findById(search).then(item => {
    bcrypt
      .compare(item.email, email)
      .then(isMatch => {
        if (isMatch) {
          item
            .deleteOne()
            .then(() => {
              res.json({ success: true });
            })
            .catch(err => {
              res.status(404).json(err);
            });
        } else {
          error.email = "Email incorrect";
          res.status(404).json(errors);
        }
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });
});
// @route GET item/test
// @desc test model
// @access Public
router.get("/test", (req, res) => {
  const errors = {};
  item
    .find()
    .then(items => {
      res.json(items);
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

module.exports = router;
