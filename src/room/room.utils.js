const twilio = require('twilio');

const { AccessToken } = twilio.jwt;
const { VideoGrant } = AccessToken;

const config = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET,
  },
};

const generateVideoToken = (userName, roomId) => {
  // create a video grant for this specific room
  const videoGrant = new VideoGrant({ room: roomId });

  // create an access token
  const token = new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret,
    // add the identity of the person joining the room
    { identity: userName },
  );

  // add the video grant of the room to the token
  token.addGrant(videoGrant);
  return token.toJwt();
};

module.exports = {
  generateVideoToken,
};
