const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const apiRouter = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`
  )
  .then(() => {
    console.log("Succefully connect to database");
  })
  .catch((err) => console.log(err));

app.use("/api/v1", apiRouter);
app.use(errorHandler);

app.listen(process.env.PORT, function () {
  console.log("Server launch");
});
