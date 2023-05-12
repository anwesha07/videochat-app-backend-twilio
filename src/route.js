// the main router which will route the requests to each module

const router = require('express').Router();
const roomRouter = require('./room/room.route');
const authRouter = require('./auth/auth.route');

router.get('/', (req, res) => {
  res.json({ route: 'ok' });
});

router.use('/room', roomRouter);
router.use('/auth', authRouter);

module.exports = router;
