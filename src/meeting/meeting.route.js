const meetingRouter = require('express').Router();
const { validateReqBody } = require('./meeting.middleware');
const { joinMeetingController } = require('./meeting.controller');

meetingRouter.get('/', (req, res) => {
    res.json({meetingroute: 'ok'})
});

meetingRouter.post('/join', validateReqBody, joinMeetingController);

module.exports = meetingRouter;