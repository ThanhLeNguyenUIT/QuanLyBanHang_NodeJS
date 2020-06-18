const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(1).required()
    });
    return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(1).required()
    });
    return schema.validate(data);
};
// Product Validation
const productValidation = (data) => {
    const schema = Joi.object({
        id_product: Joi.string().min(1).required(),
        name_product: Joi.string().min(2).required(),
        category: Joi.string().min(1).required(),
        type_product: Joi.string().required(),
        ogn_price: Joi.number().required(),
        price: Joi.number().required(),
        exit: Joi.number().required()
    });
    return schema.validate(data);
};
const cateValidation = (data) => {
    const schema = Joi.object({
        name_category: Joi.string().min(2).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productValidation = productValidation;
module.exports.cateValidation = cateValidation;