const Joi = require('joi')

const schema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(255)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).required(),

    password: Joi.string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')).required(),

    picture: Joi.string().allow('')

})

module.exports = schema
