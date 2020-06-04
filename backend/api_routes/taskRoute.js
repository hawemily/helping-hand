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
  const { id, area, date, category, pinId, volunteerId, description, store, optionOne } = req.body;
  const newTask = new Task({
    id: id,
    area: area,
    date: date,
    category: category,
    pinId: pinId,
    volunteerId: volunteerId,
    description: description,
    store: store,
    optionOne: optionOne != 'null' ? optionOne : null
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
