const express = require("express");
const router = express.Router();

const Service = require("../models/serviceSchema");
const Task = require("../models/taskSchema");
const Grocery = require("../models/grocerySchema");
const Laundry = require("../models/laundrySchema");
const PinSchema = require("../models/pinSchema");

// root route /services

//recurring task creation functions
//create new task
const createTask = (service, pinId, res) => {
  console.log('creating task');

  const newTask = new Task({
    pinId: pinId,
    service: service._id,
  });

  PinSchema.findByIdAndUpdate(pinId, { $push: { requests: newTask._id } });

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
  console.log('creating service');
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
// router.get("/", (req, res) => {
//   var services = [];
//   const { pinId } = req.body;

//   const findService = (elem) => {
//     return new Promise((resolve, reject) => {
//       Service.findOne({
//         taskId: elem._id,
//       })
//         .then((serv) => {
//           if (serv != null) {
//             services.push({
//               valid: true,
//               task: elem,
//               service: serv,
//             });
//           }
//           resolve();
//         })
//         .catch((err) => {
//           services.push({
//             valid: false,
//             task: elem,
//             error: err,
//           });
//           console.error(err);
//           resolve();
//         });
//     });
//   };

//   Task.find(
//     {
//       pinId: pinId,
//     },
//     async function (err, result) {
//       const promises = result.map(findService);
//       await Promise.all(promises);
//       res.json({
//         success: true,
//         services: services,
//       });
//     }
//   ).catch((err) => {
//     res.status(400).json({
//       success: false,
//       error: err,
//     });
//   });
// });

router.get("/", (req,res) => {
  Service.find()
  .then((items) => res.json({success: true, services: items}))
})

//TODO: emily tmr -> add id for each user
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
      console.log(tasks);
      console.log(tasks.length);
      if (tasks.length !== 0) {
        var detailsArr = [];

        console.log(`taskslen:${tasks.length}`);
        console.log(tasks);
        tasks.map((task) => {
          const service = task.service;
          if (service != null) {
            const details = task.service.details;
            detailsArr.push({
              date: service.date,
              time: service.time,
              category: service.category,
              store: details.store,
              basket: details.basket,
              volunteerId: task.volunteerId,
              taskId: task._id,
            });
          } else {
            detailsArr.push({
              // date: service.date,
              // time: service.time,
              // category: service.category,
              // store: details.store,
              // basket: details.basket,
              volunteerId: task.volunteerId,
              taskId: task._id,
            });
          }
        });
        res.json(detailsArr);
      } else {
        console.log(405);
        // console.log(task);
        res.status(405).json({ success: false, error: err });
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
  Service.findById(req.params.id).then((item) => item.remove())
  .then(res.json({success: true}))
})

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

module.exports = router;
