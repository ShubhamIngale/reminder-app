const otpMailer = (data) => {
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
                to: data?.email,
                subject: `OTP for Reminder App`,
                html: `Hello ${data?.name}, <b>${data?.otp?.code}</b> is your OTP to continue`
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

module.exports = otpMailer