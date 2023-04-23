const authRouter = require('express').Router();

const {validateRegisterDataBody, validateLoginDataBody} = require('./auth.middleware');
const {registerUserController, loginUserController} = require('./auth.controller');


authRouter.get('/', (req, res) => {
    res.json({authroute: 'ok'});
});

authRouter.post('/register', validateRegisterDataBody, registerUserController);
authRouter.post('/login', validateLoginDataBody, loginUserController);

module.exports = authRouter;