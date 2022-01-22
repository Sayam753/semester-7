const Joi = require('joi')

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).required(),

    password: Joi.string().required(),

})

module.exports = schema
