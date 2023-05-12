/* eslint-disable no-underscore-dangle */
const { asyncWrap } = require('../utils');
const { registerUserService, loginUserService, logoutUserService } = require('./auth.service');

const registerUserController = asyncWrap(async (req, res) => {
  const { userName, password } = req.body;
  const user = await registerUserService(userName, password);
  res.status(201).json(user);
});

const loginUserController = asyncWrap(async (req, res) => {
  const { userName, password } = req.body;
  const loggedInUser = await loginUserService(userName, password);
  res.json(loggedInUser);
});

const logoutUserController = asyncWrap(async (req, res) => {
  const userId = req.user._id;
  const loggedOutUser = await logoutUserService(userId);
  res.status(200).json(loggedOutUser);
});

const verifyLoggedInUserController = (req, res) => {
  res.status(200).json({
    userId: req.user._id,
    userName: req.user.userName,
    isLoggedIn: true,
  });
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  verifyLoggedInUserController,
};
