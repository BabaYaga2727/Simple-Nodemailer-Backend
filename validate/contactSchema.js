const joi = require("joi")

const contactSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    subject: joi.string().min(5).max(50).required(),
    message: joi.string().min(5).max(5000).required(),
})

module.exports = contactSchema