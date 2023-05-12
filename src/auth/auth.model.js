const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    min: 3,
    max: 30,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  token: {
    type: String,
    default: null,
  },
});

const User = mongoose.model('User', userSchema);

const saveNewUser = async (userDetails) => {
  const newUser = new User(userDetails);
  return newUser.save();
};

const getUserByUserName = async (userName) => User.findOne({ userName });

const getUserByUserId = async (userId) => User.findById(userId);

const updateToken = (id, token) =>
  User.findByIdAndUpdate(id, { token }, { new: true });

const resetTokenByUserId = (id) =>
  User.findByIdAndUpdate(id, { token: null }, { new: true });

module.exports = {
  saveNewUser,
  getUserByUserName,
  updateToken,
  getUserByUserId,
  resetTokenByUserId,
};
