const express = require("express");
const bcrypt = require("bcrypt");
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
    .find({}, '-email -__v')
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
    .find(req.body, '-email -__v')
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
            $set: {
              username: updatedItem.username,
              content: updatedItem.content
            }
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
  let errors = {};
  let search = { _id: req.body._id };
  let email = req.body.email;
  item
    .findById(search)
    .then(item1 => {
      bcrypt
        .compare(email, item1.email)
        .then(isMatch => {
          if (isMatch) {
            item1
              .remove()
              .then(() => {
                res.json({ success: true });
              })
              .catch(err => {
                res.status(404).send("remove error");
              });
          } else {
            errors.email = "Email incorrect";
            res.status(200).send("Incorrect Email");
          }
        })
        .catch(err => {
          res.status(404).send("compare fail");
        });
    })
    .catch(err => {
      res.status(404).send("find error");
    });
});

// @route GET item/test
// @desc test model
// @access Public
router.get("/test", (req, res) => {
  item
    .find()
    .then(items => {
      res.json(items);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
