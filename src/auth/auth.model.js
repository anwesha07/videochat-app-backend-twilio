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
  token : {
    type: String,
    default: null
  }
});

const User = mongoose.model("User", userSchema);

const saveNewUser = async(userDetails) => {
    const newUser = new User(userDetails);
    return newUser.save();
}

const getUserByUserName = async (userName) => {
  return User.findOne({ userName });
}

const getUserByUserId = async (userId) => {
  return User.findById(userId);
}

const updateToken = (id, token) => {
  return User.findByIdAndUpdate(id, { token }, { new: true });
}

const resetTokenByUserId = (id) => {
  return User.findByIdAndUpdate(id, {token: null}, { new: true } )
}

module.exports = {
    saveNewUser,
    getUserByUserName,
    updateToken,
    getUserByUserId,
    resetTokenByUserId
}
