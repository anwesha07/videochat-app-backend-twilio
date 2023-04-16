const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;




const config = {
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        apiKey: process.env.TWILIO_API_KEY,
        apiSecret: process.env.TWILIO_API_SECRET
      }
};

// creating adhoc twilio rooms
const generateVideoToken = (req, res, next) => {
    console.log(req.body);
    // req body will contain username and roomname
    // config will contain twilio account details 
    console.log(config);

    // create a video grant for this specific room
    const videoGrant = new VideoGrant({room: req.body.roomName});

    // create an access token
    const token = new AccessToken(
        config.twilio.accountSid,
        config.twilio.apiKey,
        config.twilio.apiSecret,
        //add the identity of the first person joining the room
        { identity: req.body.userName }
    );

    // add the video grant of the room to the token
    token.addGrant(videoGrant);

    //send the token for the room
    req.token = token;
    next();
};

module.exports = generateVideoToken;