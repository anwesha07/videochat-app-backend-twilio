const { createRoomService } = require('./room.service')

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
module.exports = {
    createRoomController
}