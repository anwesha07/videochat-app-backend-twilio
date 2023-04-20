const { generateVideoTokenService } = require('./meeting.service');

const joinMeetingController = (req, res) => {
    //extract details
    const user = req.body.userName;
    const room = req.body.roomId;
    // const passCode = req.body.passCode;


    // verify passcode
    // fetch token
    const token = generateVideoTokenService(user, room);
    res.json({
        user,
        room,
        token
    });
}

module.exports = {
    joinMeetingController
}