const Joi = require('joi');
const { BadRequestException } = require('../utils/exceptions');

const validateCreateRoomReqBody = async (req, res, next) => {
  console.log(req.body);
  const createRoomBodySchema = Joi.object({
    passcode: Joi.string().alphanum().length(6).required(),
  });

  try {
    await createRoomBodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(new BadRequestException(error.message));
  }
};

const validateJoinMeetingReqBody = async (req, res, next) => {
  const joinMeetingBodySchema = Joi.object({
    roomId: Joi.string().alphanum().length(10).required(),
    passcode: Joi.string().alphanum().length(6).required(),
  });
  try {
    await joinMeetingBodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(new BadRequestException(error.message));
  }
};

module.exports = {
  validateCreateRoomReqBody,
  validateJoinMeetingReqBody,
};
