const express = require("express");
const router = express.Router();

const Service = require("../models/serviceSchema");
const Task = require("../models/taskSchema");
const Grocery = require("../models/grocerySchema");
const Laundry = require("../models/laundrySchema");

// root route /services

//recurring task creation functions
//create new task
const createTask = (service, pinId, res) => {
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
  newService.save().then((service) => {
    createTask(service, pinId, res);
  });
};

//@route GET /services
//@desc get all tasks from all users
//@access public
// need to research how to send id of user over
// todo generate
// hi emolo think it's better to limit to just calling them tasks and services in the backend or else v confusing
router.get("/", (req, res) => {
  var services = [];
  const { pinId } = req.body;

  const findService = (elem) => {
    return new Promise((resolve, reject) => {
      Service.findOne({
        taskId: elem._id,
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
            error: err,
          });
          console.error(err);
          resolve();
        });
    });
  };

  Task.find(
    {
      pinId: pinId,
    },
    async function (err, result) {
      const promises = result.map(findService);
      await Promise.all(promises);
      res.json({
        success: true,
        services: services,
      });
    }
  ).catch((err) => {
    res.status(400).json({
      success: false,
      error: err,
    });
  });
});

//TODO: emily tmr -> add id for each user
router.get("/allRequests", (req, res) => {
  Service.find().then((item) => {
    const compareDates = (x, y) => {
      if (typeof x.date === "undefined" || typeof y.date === "undefined") {
        return 0;
      }
      return x.date > y.date ? -1 : x.time > y.time ? -1 : 1;
    };

    item.sort((x, y) => compareDates(x, y));

    res.json(item);
  });
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

  // Dhivs -- create new laundry runs and call create service in each one
  // refer to router.post("/groceries to see how it works")
  // also changed the tops bottoms thing to one whole basket -> should be easier to store
});

module.exports = router;
