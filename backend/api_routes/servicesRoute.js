const express = require("express");
const router = express.Router();

const Service = require("../models/servicesSchema");
const Task = require("../models/taskSchema");

//@route GET /getHelp/requestList
//@desc get all requests of user
//@access public
// need to research how to send id of user over
// todo generate
router.get("/requestList", (req, res) => {
  Task.find({}).then((task) => res.json(task));
  //   const { pinID } = req.body;
  //   Task.find({ taskID: pinID }).then((task) => res.json(task));
});

//@route POST /getHelp/groceries
//@desc post grocery list of user
//@access public
router.post("/groceries", (req, res) => {
  const { taskID, store, date, time, basket, pinID } = req.body;
  const newService = new Service({
    taskID: taskID,
    area: store,
    date: date,
    time: time,
    basket: basket,
  });
  newService
    .save()
    .then((item) => res.json(item))
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating Task",
      })
    );

  const newTask = new Task({
    taskID: taskID,
    pinID: pinID,
  });
  newTask
    .save()
    .then((item) => res.json(item))
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating Task",
      })
    );
});

module.exports = router;
