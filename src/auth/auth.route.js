const authRouter = require('express').Router();

const {validateRegisterDataBody} = require('./auth.middleware');
const {registerUserController} = require('./auth.controller');


authRouter.get('/', (req, res) => {
    res.json({authroute: 'ok'});
});

authRouter.post('/register', validateRegisterDataBody, registerUserController);

module.exports = authRouter;