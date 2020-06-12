const express = require("express");
const router = express.Router();

const Pin = require("../models/pinSchema");

//@route GET /pins
//@desc get all pins
//@access public
router.get("/", (req, res) => {
  Pin.find()
    .then((pins) => {
      res.json({
        success: true,
        pins: pins,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err,
      });
    });
});

//@route GET /pins/:id
//@desc get a pin's info by pin id
//@access public
router.get("/:id", (req, res) => {
  Pin.findById(req.params.id)
    .then((pin) => {
      res.json({
        success: true,
        pin: pin,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err,
      });
    });
});

//@route POST /pins
//@desc create new pin account
//@access public
router.post("/", (req, res) => {
  const {
    firstName,
    lastName,
    firstAddress,
    streetName,
    postCode,
    phoneNumber,
    password,
    email,
    niNo,
  } = req.body;
  const newPin = new Pin({
    firstName: firstName,
    lastName: lastName,
    firstAddress: firstAddress,
    streetName: streetName,
    postCode: postCode,
    phoneNumber: phoneNumber,
    password: password,
    email: email,
    niNo: niNo,
  });

  Pin.find({ email: email })
    .then((result) => {
      if (result.length == 0) {
        newPin
        .save()
        .then((item) => res.json({ success: true, id: item._id }))
        .catch((err) =>
          res.status(400).json({
            success: false,
            error: err,
          })
        );
      } else {
        res
          .status(403)
          .json({ success: false, error: "Email already exists! Please login." });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      })
    });
});

//@route POST /pins/login
//@desc Post pin login authentication
//@access Public
router.post("/login", (req, res) => {
  console.log("login in pins");
  const { email, password } = req.body;
  console.log(req.body);
  Pin.findOne({ email: email })
    .then((item) => {
      console.log(item);
      if (item != null && item.password === password) {
        console.log("suucess");
        res.json({
          success: true,
          id: item._id,
          type: "pin",
        });
      } else {
        res.status(404).json({
          success: false,
          error: "Wrong combo",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        error: err,
      });
    });
});

module.exports = router;
