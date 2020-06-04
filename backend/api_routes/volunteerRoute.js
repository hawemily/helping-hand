const express = require("express");
const router = express.Router();

const Volunteer = require("../models/volunteerSchema");

//@route GET /volunteers
//@desc Get All volunteers
//@access Public
router.get("/", (req, res) => {
  Volunteer.find().then((volunteers) => res.json(volunteers));
});

//@route Post /volunteers
//@desc Post A volunteers
//@access Public
router.post("/", (req, res) => {
  const { id, name, email, jobType } = req.body;
  const newVolunteer = new Volunteer({
    id: id,
    name: name,
    email: email,
    jobType: jobType,
  });
  newVolunteer
    .save()
    .then((item) => res.json(item))
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating Volunteer",
      })
    );
});

//@route delete /volunteers/:id
//@desc Delete A volunteers
//@access Public
router.delete("/:id", (req, res) => {
  Volunteer.findById(req.params.id)
    .then((item) => item.remove())
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
