const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewModel");

exports.createReview = catchAsync(async (req, res, next) => {
  // ALLOW NESTED ROUTERS
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});
exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourID };
  const reviews = await Review.find();
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});
