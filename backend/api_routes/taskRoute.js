const express = require("express");
const router = express.Router();

const Task = require("../models/taskSchema");
const Service = require("../models/serviceSchema");

//@route GET /tasks
//@desc Get All tasks
//@access Public
router.get("/", (req, res) => {
  Task.find().then((tasks) =>
    res.json({
      success: true,
      tasks: tasks,
    })
  );
});

// @route POST /tasks/assign/:id
// @desc assign volunteer id to task item
// @access Public
router.post("/assign", (req, res) => {
  const { volunteerId, id } = req.body;
  Task.findByIdAndUpdate(id, { volunteerId: volunteerId })
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

//@route GET /tasks/getService/:id
//@desc Get associated service
//@access Public
router.get("/getService/:id", (req, res) => {
  const taskId = req.params.id;
  Service.findOne({
    taskId: taskId,
  })
    .then((result) => {
      if (result != null) {
        res.json({
          success: true,
          service: result,
        });
      } else {
        res.status(404).json({
          success: false,
          error: result,
        });
      }
    })
    .catch((err) =>
      res.status(404).json({
        success: false,
        error: err,
      })
    );
});

//@route Post /tasks
//@desc Post A tasks
//@access Public
router.post("/", (req, res) => {
  const { pinId, volunteerId } = req.body;
  const newTask = new Task({
    pinId: pinId,
    volunteerId: volunteerId,
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
//@desc get all tasks of a volunteer
//@access Public
router.get("/:id", (req, res) => {
  const services = [];
  const findService = (task) => {
    Service.findOne({ taskId: task._id }, (err, service) => {
      services.push(service);
    });
  };

  Task.findById(req.params.id)
    .then((tasks) => tasks.map((task) => findService(task)))
    .then(() => res.json(services))
    .catch((err) =>
      res.status(404).json({
        success: false,
        errMessage: "could not retrieve tasks of user",
      })
    );
});

module.exports = router;
