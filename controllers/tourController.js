const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitingFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate("reviews");
  if (!tour) {
    return next(new AppError("No tour found with that Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.createTours = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError("No tour found with that Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError("No tour found with that Id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  // console.log("inside getTourStats");
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: "$difficulty",
        numRatings: { $sum: "$ratingsQuantity" },
        numTours: { $sum: 1 },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
      },
    },
    {
      $sort: {
        avgPrice: 1,
      },
    },
  ]);

  // console.log(stats);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  // const year = 2021;
  console.log(year);
  const plan = await Tour.aggregate([
    { $unwind: `$startDates` },
    { $set: { startDates: { $toDate: "$startDates" } } },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: `$startDates` },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
  ]);
  console.log(plan);
  res.status(200).json({
    status: "success",
    data: {
      plan,
    },
  });
});
