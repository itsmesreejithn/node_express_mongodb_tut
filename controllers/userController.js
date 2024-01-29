const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "erro",
    message: "This router is not yet defined",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "erro",
    message: "This router is not yet defined",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "erro",
    message: "This router is not yet defined",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "erro",
    message: "This router is not yet defined",
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. please use /updateMyPassword",
        400
      )
    );
  }

  const filteredBody = filterObj(res.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: ture,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  req.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});
