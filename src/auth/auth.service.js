const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const { BadRequestException, NotFoundException, UnauthorisedException, ConflictException } = require('../utils/exceptions');

const { saveNewUser, getUserByUserName, updateToken, resetTokenByUserId } = require('./auth.model');
const saltRounds = 10;


const registerUserService = async (userName, password) => {

    //check whether username is unique or not
    const user = await getUserByUserName(userName);
    if (user) throw new ConflictException("User already exists!")

    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await saveNewUser({
        userName,
        password : hashedPassword,
    });

    const token = jwt.sign(
        {
            userId: newUser._id
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: "24h"
        }
    );
    const loggedInUser = await updateToken(newUser._id, token);
    return loggedInUser;
    
}

const loginUserService = async (userName, password) => {
    const user = await getUserByUserName(userName);
    if (!user) throw new UnauthorisedException("Incorrect credentials");

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
        throw new UnauthorisedException("incorrect credentials");
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