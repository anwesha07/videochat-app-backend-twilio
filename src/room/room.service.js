const ShortUniqueId = require('short-unique-id');
const { createNewRoom } = require('./room.model')

const createRoomService = async (passcode, creator) => {
    const uid = new ShortUniqueId({ 
        length: 10,
        dictionary: 'alpha_lower'
     });
    const roomId = uid();
    const roomDetails = await createNewRoom(roomId, passcode, creator);
    return roomDetails;
}

module.exports = {
    createRoomService
}