const mailer = (email, data) => {
        const nodemailer = require('nodemailer')
        var transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                secure: false,
                auth: {
                        user: process.env.mailer_email,
                        pass: process.env.mailer_password
                }
        })

        var mailOptions = {
                from: 'singale864@gmail.com',
                to: email,
                subject: `Reminder: ${data?.title}`,
                html: `Title: ${data?.title} <br/> Description: ${data?.description} <br/> Date: ${data?.date}`
        }

        transporter.sendMail(mailOptions, function(err, info) {
                if(err) {
                        console.log(err)
                }
                else {
                        console.log('Email sent'+info.response)
                }
        })
}

module.exports = mailer