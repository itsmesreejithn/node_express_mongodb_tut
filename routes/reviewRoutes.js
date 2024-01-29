const express = require("express");
const authenticationController = require("../controllers/authenticationController");
const reviewController = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.use(authenticationController.protect);
router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authenticationController.restrictTo("user"),
    reviewController.createReview
  );

module.exports = router;
