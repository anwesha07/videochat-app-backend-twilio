const Joi = require('joi');

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
        res.status(400).send({error});
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
        res.status(400).send(error.message);
    }
}


module.exports = {
    validateRegisterDataBody,
    validateLoginDataBody
}