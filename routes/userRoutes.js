const express = require("express");
const userContorller = require("../controllers/userController");
const authenticationController = require("../controllers/authenticationController");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.post("/signup", authenticationController.signUp);
router.post("/login", authenticationController.login);

router.post("/forgotPassword", authenticationController.forgotPassword);
router.patch("/resetPassword/:token", authenticationController.resetPassword);

router.use(authenticationController.protect);

router.delete("/delteMe", userContorller.deleteMe);
router.get("/me", userContorller.getMe, userContorller.getUser);
router.patch("/updatMyPassword", authenticationController.updatPassword);
router.patch("/updateMe", userContorller.updateMe);

router.use(authenticationController.restrictTo("admin"));

router
  .route("/")
  .get(userContorller.getAllUsers)
  .post(userContorller.createUser);

router
  .route("/:id")
  .get(userContorller.getUser)
  .patch(userContorller.updateUser)
  .delete(userContorller.deleteUser);

module.exports = router;
