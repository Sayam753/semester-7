const Joi = require('joi')

const schema = Joi.object({
    title: Joi.string().required(),

    description: Joi.string().required(),

    image_url: Joi.string().required(),

    model_url: Joi.string().allow(''),

})

module.exports = schema