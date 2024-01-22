const express = require("express");
// Logging module
const morgan = require("morgan");

const app = express();
// Data from body is added to reqest (middelware)
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
