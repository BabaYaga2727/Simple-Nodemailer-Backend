require("dotenv").config()
const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    socketTimeout: 20000,
    maxConnections: 5,
    maxMessages: 10
})
module.exports = { transporter }