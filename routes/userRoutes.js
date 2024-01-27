const express = require("express");
const userContorller = require("../controllers/userController");
const authenticationController = require("../controllers/authenticationController");

const router = express.Router();

router.post("/signup", authenticationController.signUp);
router.post("/login", authenticationController.login);

router.post("/forgotPassword", authenticationController.forgotPassword);
router.patch("/resetPassword/:token", authenticationController.resetPassword);
router.delete(
  "/delteMe",
  authenticationController.protect,
  userContorller.deleteMe
);

router.patch(
  "/updatMyPassword",
  authenticationController.protect,
  authenticationController.updatPassword
);

router.patch(
  "/updateMe",
  authenticationController.protect,
  userContorller.updateMe
);

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
