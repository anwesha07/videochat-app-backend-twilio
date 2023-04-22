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
    type: [String],

  }
});

const User = mongoose.model("User", userSchema);

const saveNewUser = async(userDetails) => {
    const newUser = new User(userDetails);
    return newUser.save();
}

module.exports = {
    saveNewUser
}
