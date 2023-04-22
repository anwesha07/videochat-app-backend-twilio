// the main router which will route the requests to each module

const router = require('express').Router();
const meetingRouter = require('./meeting/meeting.route');
// const roomRouter = require('./room/room.route.js');
const authRouter = require('./auth/auth.route.js');

router.get('/', (req, res) => {
    res.json({route: 'ok'})
});

router.use('/meeting', meetingRouter);
// router.use('./room', roomRouter);
router.use('/auth', authRouter);

module.exports = router;
