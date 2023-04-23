const { required } = require('joi');
const Joi = require('joi');

const validateCreateRoomReqBody = async(req, res, next) => {
    console.log(req.body);
    const createRoomBodySchema = Joi.object({
        passcode: Joi.string()
            .alphanum()
            .length(6)
            .required(),
    });

    try {
        await createRoomBodySchema.validateAsync(req.body);
        next();
    } catch(error) {
        res.status(400).json({error: error.message});
    }


}
 
module.exports = {
    validateCreateRoomReqBody,
}