const { createRoomService, joinMeetingService } = require('./room.service');
const { asyncWrap } = require('../utils');

const createRoomController = asyncWrap(async (req, res) => {
  const { passcode } = req.body;
  // console.log(passcode);
  // eslint-disable-next-line no-underscore-dangle
  const creator = req.user._id;
  const roomDetails = await createRoomService(passcode, creator);
  res.status(201).json(roomDetails);
});

const joinMeetingController = asyncWrap(async (req, res) => {
  const { userName } = req.user;
  const { roomId, passcode } = req.body;
  const token = await joinMeetingService(userName, roomId, passcode);
  res.status(200).json({
    userName,
    roomId,
    token,
  });
});

module.exports = {
  createRoomController,
  joinMeetingController,
};
