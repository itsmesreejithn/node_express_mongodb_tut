const helmet = require("helmet");
const express = require("express");
const xxs = require("xss-clean");
const mongoSanitizer = require("express-mongo-sanitize");
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
app.use(mongoSanitizer()); // PREVENTS USEAGE OF "$"

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
const reviewRouter = require("./routes/reviewRoutes");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERROR HANDELING
app.use(globalErrorHandler);

module.exports = app;
