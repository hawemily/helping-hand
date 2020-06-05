const express = require("express");
const router = express.Router();

const Service = require("../models/serviceSchema");
const Task = require("../models/taskSchema");

//@route GET /getHelp/services
//@desc get all tasks from all users
//@access public
// need to research how to send id of user over
// todo generate
// hi emolo think it's better to limit to just calling them tasks and services in the backend or else v confusing
router.get("/services", (req, res) => {
  var services = [];
  const {
    pinId
  } = req.body;

  const findService = (elem) => {
    return new Promise((resolve, reject) => {
      Service.findOne({
          "taskId": elem._id
        })
        .then((serv) => {
          if (serv != null) {
            services.push({
              valid: true,
              task: elem,
              service: serv,
            });
          }
          resolve();
        })
        .catch((err) => {
          services.push({
            valid: false,
            task: elem,
            error: err
          });
          console.error(err);
          resolve();
        });
    });
  }

  Task.find({
      "pinId": pinId
    }, async function (err, result) {
      const promises = result.map(findService);
      await Promise.all(promises);
      res.json({
        success: true,
        services: services,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: err,
      });
    });

});

// FOR TESTING ONLY NEED TO DELETE LATER
//@route GET /getHelp/services
//@desc Get All services in the db
//@access Public
router.get("/allServices", (req, res) => {
  Service.find().then((item) => res.json(item));
});

router.delete("/deleteAll", (req, res) => {
  Service.remove({}).then((item) => res.json(item));
})

// END TESTING ROUTES

//@route GET /getHelp/service/:id
//@desc get individual service item using task id
//@access public
router.get("/service/:id", (req, res) => {
  Service.findById(req.params.id)
    .then((item) => {
      if (item != null) {
        res.json({
          success: true,
          response: item
        })
      } else {
        res.status(404).json({
          success: false,
          response: "Service Not Found"
        })
      }
    })
    .catch((err) => res.status(404).json({
      success: false,
      error: err
    }));
})

//@route POST /getHelp/groceries
//@desc post grocery list of user
//@access public
router.post("/groceries", (req, res) => {
  const {
    area,
    store,
    date,
    time,
    basket,
    substitutions,
    pinId,
    volunteerId
  } = req.body;


  const createService = (task) => {
    const newService = new Service({
      taskId: task._id,
      area: area,
      store: store,
      date: date,
      time: time,
      basket: basket,
      category: "groceries",
      optionOne: substitutions
    });
    newService
      .save()
      .then((item) => res.json({
        success: true,
        task: task,
        service: item
      }))
      .catch((err) =>
        res.status(400).json({
          success: false,
          error: err
        })
      );
  }

  const newTask = new Task({
    volunteerId: volunteerId,
    pinId: pinId,
  });

  newTask
    .save()
    .then((item) => {
      createService(item);
    })
    .catch((err) =>
      res.status(400).json({
        success: false,
        error: err,
      })
    );
});

module.exports = router;