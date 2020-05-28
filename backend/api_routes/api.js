const express = require("express");
const router = express.Router();

//Contact Model
const Contact = require("../models/schema");

//@route GET /contacts
//@desc Get All contacts
//@access Public
router.get("/volunteers", (req, res) => {
  Contact.find().then((contacts) => res.json(contacts));
});

//@route Post /contacts
//@desc Post A contacts
//@access Public
router.post("/volunteers", (req, res) => {
  const { name, email, jobType } = req.body;
  const newContact = new Contact({
    name: name,
    email: email,
    jobType: jobType,
  });
  newContact
    .save()
    .then((item) => res.json(item))
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating User",
      })
    );
});

//@route delete /contacts/:id
//@desc Delete A contacts
//@access Public
router.delete("/volunteers/:id", (req, res) => {
  Contact.findById(req.params.id)
    .then((item) => item.remove())
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
