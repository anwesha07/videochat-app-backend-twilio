const { createRoomService, joinMeetingService } = require('./room.service')

const createRoomController = async (req, res) => {
    const passcode = req.body.passcode;
    console.log(passcode);
    const creator = req.user._id;
    try {
        const roomDetails = await createRoomService(passcode, creator);
        res.status(201).json(roomDetails);
    } catch(error) {
        res.status(400).json({error: error.message})
    }
} 

const joinMeetingController = async (req, res) => {
    const userName = req.user.userName;
    const roomId = req.body.roomId;
    const passcode = req.body.passcode;

    try {
        const token = await joinMeetingService(userName, roomId, passcode);
        res.json({
            userName,
            roomId,
            token
        })
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createRoomController,
    joinMeetingController
}