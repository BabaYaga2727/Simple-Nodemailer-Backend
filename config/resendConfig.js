const { Resend } = require("resend")

const resend = new Resend(process.env.RESEND_API_KEY)

const mailSender = async (name, email, subject, message)=>{
    try{
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: process.env.TEAM_EMAIL,
            reply_to: email,
            subject: `New Contact Form: ${subject}`,
            text: `
            From: ${name}\n\n 

            Email: ${email}\n\n

            Title: ${subject}

            Message: ${message}
            `
        })

        return {success: true, message: "Message sent successfully"}

    }catch(e){
        console.error(e);
        return { success: false, error: "Email failed"}        
    }
}


module.exports = mailSender