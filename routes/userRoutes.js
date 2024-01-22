const express = require("express");
const userContorller = require("../controllers/userController");
const router = express.Router();

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
