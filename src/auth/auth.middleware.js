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
        res.status(404).send({error});
    }
}

module.exports = {
    validateRegisterDataBody
}