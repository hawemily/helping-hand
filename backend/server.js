const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const api = require("./api_routes/api");

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
app.use("/", api);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
