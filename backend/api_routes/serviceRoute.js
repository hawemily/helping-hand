const express = require("express");
const router = express.Router();

const Service = require("../models/serviceSchema");
const Task = require("../models/taskSchema");
const Grocery = require("../models/grocerySchema");
const Laundry = require("../models/laundrySchema");
const Volunteer = require("../models/volunteerSchema");

// root route /services

//recurring task creation functions
//create new task
const createTask = (service, pinId, res) => {
  console.log("creating task");

  const newTask = new Task({
    pinId: pinId,
    service: service._id,
  });

  newTask
    .save()
    .then((task) => res.json({ success: true, task: task }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};

// create service record
const createService = (groceryRun, category, pinId, date, time, res) => {
  const newService = new Service({
    date: date,
    time: time,
    category: category,
    details: groceryRun._id,
  });
  console.log("creating service");
  newService.save().then((service) => {
    createTask(service, pinId, res);
  });
};

//@route GET /services
//@desc get all requests from all users
//@access public
// @route
router.get("/", (req, res) => {
  Task.find()
    .populate({ path: "services", populate: { path: "details" } })
    .then((tasks) => res.json(tasks));
});

//@route GET /services/allRequests/:id
//@desc get all reqeusts made by user id <id>
router.get("/allRequests/:id", (req, res) => {
  const pinId = req.params.id;
  console.log(pinId);

  Task.find({ pinId: pinId })
    .populate({
      path: "service",
      populate: { path: "details" },
    })
    .exec(function (err, tasks) {
      if (err) {
        console.log(404);
        res.status(404).json({ success: false, error: err });
        return;
      }
      // console.log(tasks);
      console.log(tasks.length);
      if (tasks.length !== 0) {
        var detailsArr = [];

        console.log(`taskslen:${tasks.length}`);
        tasks.map((task) => {
          const service = task.service;
          const details = task.service.details;
          detailsArr.push({
            date: service.date,
            time: service.time,
            category: service.category,
            store: details.store,
            basket: details.basket,
            volunteerId: task.volunteerId,
            taskId: task._id,
            status: task.status,
          });
        });
        res.json(detailsArr);
      } else {
        console.log("no tasks");
        // console.log(task);
        res.json(detailsArr);
      }
    });

  // Service.find().then((item) => {
  //   const compareDates = (x, y) => {
  //     if (typeof x.date === "undefined" || typeof y.date === "undefined") {
  //       return 0;
  //     }
  //     return x.date > y.date ? -1 : x.time > y.time ? -1 : 1;
  //   };

  //   item.sort((x, y) => compareDates(x, y));

  //   res.json(item);
  // });
});

// FOR TESTING ONLY NEED TO DELETE LATER
//@route GET /services
//@desc Get All services in the db
//@access Public
router.get("/allServices", (req, res) => {
  Service.find().then((item) => res.json(item));
});

router.delete("/deleteAll", (req, res) => {
  Service.remove({}).then((item) => res.json(item));
});

router.delete("/:id", (req, res) => {
  Service.findById(req.params.id)
    .then((item) => item.remove())
    .then(res.json({ success: true }));
});

// END TESTING ROUTES

//@route GET /services/service/:id
//@desc get individual service item using task id
//@access public
router.get("/service/:id", (req, res) => {
  Service.findById(req.params.id)
    .then((item) => {
      if (item != null) {
        res.json({
          success: true,
          response: item,
        });
      } else {
        res.status(404).json({
          success: false,
          response: "Service Not Found",
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

//@route POST /services/groceries
//@desc post grocery list of user
//@access public
router.post("/groceries", (req, res) => {
  const { store, date, time, basket, subs, pinId } = req.body;
  console.log("backend groceries api hit");

  // TODO: emily - add this request to requests of pin in pin model

  // create new details record
  const newGroceryRun = new Grocery({
    basket: basket,
    store: store,
    subs: subs,
  });

  newGroceryRun.save().then((groceryRun) => {
    createService(groceryRun, "Grocery", pinId, date, time, res);
  });
});

//@route POST /services/laundry
//@desc post laundry request of user
//@access public
router.post("/laundry", (req, res) => {
  const {
    load,
    dateOfPickup,
    timeOfPickup,
    dateOfDropoff,
    timeOfDropoff,
    detergent,
    pinId,
    basket,
  } = req.body;

  // TODO: Dhivs -- create new laundry runs and call create service in each one
  // refer to router.post("/groceries to see how it works")
  // also changed the tops bottoms thing to one whole basket -> should be easier to store
});

//@route POST /services/rating
//@desc post rating of service of volunteer
//@access public
router.post("/rating", (req, res) => {
  console.log("rating api hit");
  const { service, taskId, time } = req.body;
  Task.findById(taskId, "volunteerId").then((id) => {
    Volunteer.findByIdAndUpdate(id, {
      $push: { onTime: time },
      $push: { serviceQuality: service },
    });
  });
});

module.exports = router;
