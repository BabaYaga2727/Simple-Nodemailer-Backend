require("dotenv").config()
const express = require('express');
const contactSchema = require("./validate/contactSchema")
const mailSender = require("./config/resendConfig")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors({
    origin: "https://simple-nodemailer-frontend-f9xv.vercel.app",
    methods: ["GET", "POST"]
}))


app.get('/', async(req, res)=>{
    res.send("Get method successfully.")
})

app.post('/send-mail', async(req, res)=>{
    const { name, email, subject, message } = req.body

    const result = await mailSender(name, email, subject, message)

    if(result.success){
        res.json(result)
    }else{
        res.status(500).json(result)
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Email Microservice running on port ${PORT}`);
});

