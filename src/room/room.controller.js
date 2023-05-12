const { createRoomService, joinMeetingService } = require('./room.service')
const {asyncWrap} = require('../utils')

const createRoomController = asyncWrap(async (req, res) => {
    const passcode = req.body.passcode;
    // console.log(passcode);
    const creator = req.user._id;
    const roomDetails = await createRoomService(passcode, creator);
    res.status(201).json(roomDetails);
}) 

const joinMeetingController = asyncWrap( async (req, res) => {
    const userName = req.user.userName;
    const roomId = req.body.roomId;
    const passcode = req.body.passcode;
    const token = await joinMeetingService(userName, roomId, passcode);
    res.status(200).json({
        userName,
        roomId,
        token
    })
    
})

module.exports = {
    createRoomController,
    joinMeetingController
}