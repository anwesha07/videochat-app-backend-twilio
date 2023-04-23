// all common middlewares here

const jwt = require('jsonwebtoken')
const {validateToken} = require('./auth/auth.utils')

const authenticateUser = async (req, res, next) => {
    token = req.headers['x-token'];
    try {
        const {userId} = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(userId)
        const user = await validateToken(token, userId);
        req.user = user;
        next();
    } catch(error) {
        res.status(400).json({error: error.message});
    }

}

module.exports = {
    authenticateUser
}