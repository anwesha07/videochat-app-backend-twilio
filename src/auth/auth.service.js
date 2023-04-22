const bcrypt = require('bcrypt');
const { saveNewUser } = require('./auth.model');


const registerUserservice = async (userName, password) => {
    // hash password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await saveNewUser({
        userName,
        password : hashedPassword
    });
    return user;
}

module.exports = {
    registerUserservice
}