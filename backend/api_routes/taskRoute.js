const express = require("express");
const router = express.Router();

const Task = require("../models/taskSchema");
const Service = require("../models/serviceSchema");

//@route GET /tasks
//@desc Get All tasks where volunteer id is null
//@access Public
router.get("/", (req, res) => {
  Task.where("service")
    .ne(null)
    .where("volunteerId")
    .eq(null)
    .populate({
      path: "service",
      populate: { path: "details" },
    })
    .then((tasks) => {
      console.log(tasks);
      res.json({
        success: true,
        tasks: tasks,
      });
    });
});

// @route POST /tasks/assign
// @desc assign volunteer id to task item
// @access Public
router.post("/assign", (req, res) => {
  const { volunteerId, id } = req.body;
  // this should work with real ids
  // to test tmr thursday

  Task.findByIdAndUpdate(id, { volunteerId: volunteerId, status: "confirmed" })
    .then((task) => {
      console.log(task);
      res.json({
        success: true,
        task: task,
      });
    })
    .catch((err) =>
      res.status(404).json({
        success: false,
        error: err,
      })
    );
});

// @route POST /tasks/unassign
// @desc unassign volunteer id to task item
// @access Public
router.post("/unassign", (req, res) => {
  const { volunteerId, id } = req.body;

  Task.findByIdAndUpdate(id, { volunteerId: volunteerId, status: "pending" })
    .then((task) => {
      console.log(task);
      res.json({
        success: true,
        task: task,
      });
    })
    .catch((err) =>
      res.status(404).json({
        success: false,
        error: err,
      })
    );
});

//@route delete /tasks/:id
//@desc Delete A tasks
//@access Public
router.delete("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((item) => {
      item.remove();
      res.json({ success: true });
    })
    .catch((err) =>
      res.status(404).json({
        success: false,
        error: err,
      })
    );
});

//@route get /tasks/:id
//@desc get all services of a volunteer
//@access Public
router.get("/:id", (req, res) => {
  // to think tmr - how to nest populates? eg call populate on individual volunteer

  Task.find({ volunteerId: req.params.id })
    .populate({ path: "service", populate: { path: "details" } })
    .then((tasks) => {
      console.log(tasks);
      res.json({ success: true, tasks: tasks });
    })
    .catch((err) =>
      res.status(404).json({
        success: false,
        error: err,
        services: null,
        errMessage: "could not retrieve tasks of volunteer",
      })
    );
});

//@route POST /tasks/:id
//@desc modify a task's status
//@access Public
router.post("/complete/:id", (req, res) => {
  Task.findByIdAndUpdate(req.params.id, { status: "complete" })
    .then((task) => {
      res.json({
        success: true,
        task: task,
      });
    })
    .catch((err) =>
      res.status(404).json({
        success: false,
        error: err,
      })
    );
});

module.exports = router;
