const {registerUserservice} = require('./auth.service');

const registerUserController = async (req, res) => {
    const { userName, password } = req.body;
    
    try {
        const user = await registerUserservice(userName, password);
        res.status(201).json(user);
    } catch(error) {
        res.status(400).send({error});
    }
}

module.exports = {
    registerUserController
}