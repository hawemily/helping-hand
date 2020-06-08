const express = require("express");
const router = express.Router();

const Volunteer = require("../models/volunteerSchema");

//@route GET /volunteers
//@desc Get All volunteers
//@access Public
router.get("/", (req, res) => {
  Volunteer.find()
  .then((volunteers) => res.json({
    success: true,
    volunteers: volunteers}))
    .catch((err) => res.status(404).json({success: false, error: err}));
});

//@route GET /volunteers/get/:id
//@desc Get volunteer info by id
//@access Public
router.get("/get/:id", (req, res) => {
  Volunteer.findById(req.params.id)
  .then((volunteer) => {
    const {firstName, lastName, email, phoneNumber, password} = volunteer;
    var length = password.length;
    res.json({
    success: true,
    volunteer: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      passwordLength: length
    }
    });
    
  })
  .catch(err => res.status(404).json({
    success: false,
    error: err
  }))
});

//@route POST /volunteers/edit/:id
//@desc Edit volunteer info by id
//@access Public
router.post("/edit/:id", (req, res) => {
  Volunteer.findByIdAndUpdate({_id: req.params.id}, req.body)
  .then((volunteer) => res.json({
    success: true,
    id: volunteer
  }))
  .catch(err => res.status(404).json({
    success: false,
    error: err
  }))
});

//@route POST /volunteers/login
//@desc Post volunteer login authentication
//@access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Volunteer.find({ email: email })
    .then((item) => {
      if (item != null && item.length > 0 && item[0].password == password) {
          res.json({
            success: true,
            id: item[0]._id,
            type: 'volunteer'
          })
      } else {
        res.status(404).json({
          success: false,
          error: 'Wrong combo'
        })
      }
    })
    .catch(err =>
      {
        res.status(404).json({
        success: false,
        error: err
      });});
})

// router.delete("/del", (req,res)=>{
//   Volunteer.find({}).then((list) => {
//     list.forEach((e) => {
//       e.remove();
//     })
//   })
//   .then((item) => res.json({success: true}))
// })

//@route Post /volunteers
//@desc Post A volunteers
//@access Public
router.post("/", (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const newVolunteer = new Volunteer({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  });
  newVolunteer
    .save()
    .then((item) => res.json({ success: true, id: item._id}))
    .catch((err) =>
      res.status(400).json({
        success: false,
        error: err,
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
