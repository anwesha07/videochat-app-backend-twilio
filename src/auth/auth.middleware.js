const Joi = require('joi');
const {BadRequestException} = require('../utils/exceptions')

const validateRegisterDataBody = async (req, res, next) => {
    const registerBodySchema = Joi.object({
        userName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .min(8)
            .required(),
        confirmPassword: Joi.string()
            .required()
            .valid(Joi.ref('password')),
        });

    try {
        await registerBodySchema.validateAsync(req.body);
        next();
    } catch (error) {
        console.log(error.message);
        next(new BadRequestException(error.message));
    }
}


const validateLoginDataBody = async (req, res, next) => {
    const loginBodySchema = Joi.object({
        userName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .required()
    });

    try {
        await loginBodySchema.validateAsync(req.body);
        console.log("validating")
        next();
    } catch (error) {
        next(new BadRequestException(error.message));
    }
}


module.exports = {
    validateRegisterDataBody,
    validateLoginDataBody
}