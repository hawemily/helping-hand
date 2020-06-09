const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const volunteerApi = require("./api_routes/volunteerRoute");
const taskApi = require("./api_routes/taskRoute");
const servicesApi = require("./api_routes/serviceRoute");
const pinApi = require("./api_routes/pinRoute");

const app = express();

//Middleware
app.use(bodyParser.json());

// DB Config
const db = require("../config/keys").mongoURI;

//Connect to mongo
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

//Use Routes
app.use("/volunteers", volunteerApi);
app.use("/tasks", taskApi);
app.use("/services", servicesApi);
app.use("/pin", pinApi);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("..", "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
