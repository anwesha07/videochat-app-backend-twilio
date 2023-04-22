const meetingRouter = require('express').Router();
const { validateJoinMeetingBody } = require('./meeting.middleware');
const { joinMeetingController } = require('./meeting.controller');

meetingRouter.get('/', (req, res) => {
    res.json({meetingroute: 'ok'})
});

meetingRouter.post('/join', validateJoinMeetingBody, joinMeetingController);

module.exports = meetingRouter;