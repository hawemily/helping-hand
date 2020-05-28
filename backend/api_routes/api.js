const express = require("express");
const router = express.Router();

//Contact Model
const Contact = require("../models/schema");

//@route GET /contacts
//@desc Get All contacts
//@access Public
router.get("/contacts", (req, res) => {
  Contact.find().then((contacts) => res.json(contacts));
});

//@route Post /contacts
//@desc Post A contacts
//@access Public
router.post("/contacts", (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
  });
  newContact.save().then((item) => res.json(item));
});

//@route delete /contacts/:id
//@desc Delete A contacts
//@access Public
router.delete("/contacts/:id", (req, res) => {
  Contact.findById(req.params.id)
    .then((item) => item.remove())
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
