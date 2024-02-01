const express = require("express");
const bookingControler = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/checkout-session/:tourID",
  authController.protect,
  bookingControler.getCheckoutSession
);

module.exports = router;
