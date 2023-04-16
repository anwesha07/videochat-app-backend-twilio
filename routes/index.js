const router = require('express').Router();
const videoRoute = require("./videoRoute.js")

router.get('/', (req, res) => {
    res.json({route: 'ok'})
})

router.use('/video', videoRoute);

module.exports = router;
