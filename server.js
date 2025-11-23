require("dotenv").config()
const express = require('express');
const { transporter } = require("./config/nodemailerConfig")
const contactSchema = require("./validate/contactSchema")
const validateEmail = require("deep-email-validator").validate
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors())


app.get('/', async(req, res)=>{
    res.send("Get method successfully.")
})


app.post('/send-mail', async (req, res) => {
    
    try {
        const { error, value } = contactSchema.validate(req.body);

        if(error){
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            })
        }

        const {name, email, subject, message} = value

        const { valid, reason, validators } = await validateEmail(email)

        if(!valid){
            return res.status(400).json({
                success: false,
                message: `Invalid Email: ${validators[reason].reason}`
            })
        }
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject,
            text: `Email: ${email}\n\n Name: \n${name}\n\n Message: \n${message}`,
            replyTo: email
        }

        const confirmationMail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "We recieved your message",
            text: `
            Hi ${name},
            Thank you for contacting us!
            Our support team will reply to you soon.

            Best regards,
            Avento
            `
        }

        await transporter.sendMail(mailOptions)
        await transporter.sendMail(confirmationMail)
        return res.json({
            success: true,
            message: "Email sent successfully."
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Email Microservice running on port ${PORT}`);
});

