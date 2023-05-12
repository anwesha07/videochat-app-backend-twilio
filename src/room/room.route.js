const roomRouter = require('express').Router();
const {
  validateCreateRoomReqBody,
  validateJoinMeetingReqBody,
} = require('./room.middleware');
const {
  createRoomController,
  joinMeetingController,
} = require('./room.controller');
const { authenticateUser } = require('../middleware');

roomRouter.get('/', (req, res) => {
  res.json({ roomroute: 'ok' });
});

roomRouter.post(
  '/',
  authenticateUser,
  validateCreateRoomReqBody,
  createRoomController,
);

roomRouter.post(
  '/join',
  authenticateUser,
  validateJoinMeetingReqBody,
  joinMeetingController,
);

module.exports = roomRouter;
