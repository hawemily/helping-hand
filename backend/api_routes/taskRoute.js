const express = require("express");
const router = express.Router();

const Task = require("../models/taskSchema");

//@route GET /tasks
//@desc Get All tasks
//@access Public
router.get("/", (req, res) => {
  Task.find().then((tasks) => res.json(tasks));
});

//@route Post /tasks
//@desc Post A tasks
//@access Public
router.post("/", (req, res) => {
  const { id, pinId, volunteerId } = req.body;
  const newTask = new Task({
    taskID: id,
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
    .then((item) => item.remove())
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
