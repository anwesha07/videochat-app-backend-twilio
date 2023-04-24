const { registerUserService, loginUserService, logoutUserService } = require('./auth.service');

const registerUserController = async (req, res) => {
    const { userName, password } = req.body;
    
    try {
        const user = await registerUserService(userName, password);
        res.status(201).json(user);
    } catch(error) {
        res.status(400).send({error});
    }
}


const loginUserController = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const loggedInUser = await loginUserService(userName, password);
        res.json(loggedInUser);
    } catch(error) {
        console.log(error);
        res.status(400).send({error: error.message});
    }
}

const logoutUserController = async (req, res) => {
    try {
        const userId = req.user._id;
        const loggedOutUser = await logoutUserService(userId);
        res.status(200).json(loggedOutUser);
    } catch(error) {
        console.log(error);
        res.status(400).send({error: error.message});
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
}