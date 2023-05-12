const ShortUniqueId = require('short-unique-id');
const {
  ForbiddenException,
  NotFoundException,
  ConflictException,
} = require('../utils/exceptions');
const {
  createNewRoom,
  getRoomByRoomId,
  updateLastAccess,
} = require('./room.model');
const { generateVideoToken } = require('./room.utils');

const createRoomService = async (passcode, creator) => {
  const uid = new ShortUniqueId({
    length: 10,
    dictionary: 'alpha_lower',
  });
  const roomId = uid();
  const room = await getRoomByRoomId(roomId);
  if (room) throw new ConflictException('Room Id is not unique!');

  const roomDetails = await createNewRoom(roomId, passcode, creator);
  return roomDetails;
};

const joinMeetingService = async (userName, roomId, passcode) => {
  // verify passcode
  const room = await getRoomByRoomId(roomId);
  if (!room) throw new NotFoundException('Room doesnot exist!');

  if (room.passcode === passcode) {
    await updateLastAccess(roomId, Date.now());
    // passcode matched so generate token for room
    return generateVideoToken(userName, roomId);
  }
  throw new ForbiddenException('Wrong passcode!');
};

module.exports = {
  createRoomService,
  joinMeetingService,
};
