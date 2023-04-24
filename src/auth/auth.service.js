const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

const { saveNewUser, getUserByUserName, updateToken, resetTokenByUserId } = require('./auth.model');
const saltRounds = 10;


const registerUserService = async (userName, password) => {
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await saveNewUser({
        userName,
        password : hashedPassword
    });
    return user;
}

const loginUserService = async (userName, password) => {
    const user = await getUserByUserName(userName);
    if (!user) throw new Error("incorrect credentials");
    // compare passwords using bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        // create token
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h"
            }
        );

        const loggedInUser = await updateToken(user._id, token);
        return loggedInUser;

    } else {
        throw new Error("incorrect credentials");
    }
    
}

const logoutUserService = async (userId) => {
    return await resetTokenByUserId(userId);
}

module.exports = {
    registerUserService,
    loginUserService,
    logoutUserService
}