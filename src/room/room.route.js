const router = require('../route');

const {validateCreateRoomReqBody} = require('./room.middleware');
const { createRoomController } = require('./room.controller');
const { authenticateUser } = require('../middleware');


const roomRouter = require('express').Router();

roomRouter.get('/', (req, res) => {
    res.json({roomroute: "ok"});
});

roomRouter.post('/', authenticateUser, validateCreateRoomReqBody, createRoomController);




module.exports = roomRouter;