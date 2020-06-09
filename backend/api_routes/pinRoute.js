const express = require("express");
const router = express.Router();

const Pin = require("../models/pinSchema");

//@route GET /pin
//@desc get all pins
//@access public
router.get("/", (req, res) => {
  Pin.find()
  .then((pins) => {
    res.json({
      success: true,
      pins: pins
    })
  })
  .catch((err) => {
    res.json({
      success: false,
      error: err
    })
  })
})

//@route GET /pin/:id
//@desc get a pin's info by pin id
//@access public
router.get("/:id", (req, res) => {
  Pin.findById(req.params.id)
  .then((pin) => {
    res.json({
      success: true,
      pin: pin
    })
  })
  .catch((err) => {
    res.json({
      success: false,
      error: err
    })
  })
})

//@route POST /pin
//@desc create new pin account
//@access public
router.post("/", (req, res) => {
  const { firstName, lastName, address, phoneNumber, password, email, niNo } = req.body;
  const newPin = new Pin({
    firstName: firstName,
    lastName: lastName,
    address: address,
    phoneNumber: phoneNumber,
    password: password,
    email: email,
    niNo: niNo
  });
  newPin
  .save()
  .then((item) => res.json({ success: true, id: item._id }))
  .catch((err) =>
    res.status(400).json({
      success: false,
      error: err,
    })
  );
})

//@route POST /pin/login
//@desc Post pin login authentication
//@access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Pin.find({ email: email })
    .then((item) => {
      if (item != null && item.length > 0 && item[0].password == password) {
        res.json({
          success: true,
          id: item[0]._id,
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
