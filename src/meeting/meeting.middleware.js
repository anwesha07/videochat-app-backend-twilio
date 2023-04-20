const validateReqBody = (req, res, next) => {
    if (!req.body.roomName) {
        res.status(400).json({error: 'invalid room'}); 
        return;   
    }
    if (!req.body.userName) {
        res.status(400).json({error: 'invalid user'}); 
        return;   
    } 
    // if (!req.body.passcode) {
    //     res.status(400).json({error: 'invalid passcode'}); 
    //     return;   
    // } 
    next();
}

module.exports = {
    validateReqBody,
}