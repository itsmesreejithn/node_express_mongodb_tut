const helmet = require("helmet");
const express = require("express");
const xxs = require("xss-clean");
const sani = require("mongo-sanitize");
const hpp = require("hpp");

// Logging module
const morgan = require("morgan");

const rateLimit = require("express-rate-limit");

const app = express();

// Data from body is added to reqest (middelware)
app.use(express.json({ limit: "10kb" }));

// SET SECURITY HEADER
app.use(helmet());

// DATA SANITIZATION
app.use(xxs()); // REMOVES MALICIOUS HTML CODES AND JS CODES
app.use(sani); // PREVENTS USEAGE OF "$"

// PREVENT PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request form this IP, please try again later",
});

app.use("/api", limiter);

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const sanitize = require("mongo-sanitize");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERROR HANDELING
app.use(globalErrorHandler);

module.exports = app;
