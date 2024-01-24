const express = require("express");
const userContorller = require("../controllers/userController");
const authenticationController = require("../controllers/authenticationController");

const router = express.Router();

router.post("/signup", authenticationController.signUp);

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
