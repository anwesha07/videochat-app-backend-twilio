const router = require('express').Router();
const generateVideoToken = require('../middleware')
const validateBody = require('../middleware/validateBody.js')


//generating an Access Token for a particular user to enter a specific Video Room

router.post('/token',validateBody ,generateVideoToken ,(req, res) => {
    console.log(req.body);
    //send the token as jwt
    res.json({
        user: req.body.userName,
        room: req.body.roomName,
        token: req.token.toJwt()
    });
})



module.exports = router;