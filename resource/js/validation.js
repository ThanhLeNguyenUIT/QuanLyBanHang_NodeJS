const Joi = require('@hapi/joi');

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email().message('Vui lòng nhập email'),
        password: Joi.string().min(1).required()
    });
    return schema.validate(data);
};
module.exports.loginValidation = loginValidation;