const { verify } = require("jsonwebtoken");
const nodemailer = require("nodemailer");

var verificationCode = "";

async function sendOtp(email, otp) {
    const testAccount = await nodemailer.createTestAccount();

    verificationCode = otp;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    const mailData = {
        from: '"Todo Verification" <' + testAccount.user + '>',
        to: email,
        subject: "OTP",
        text: otp
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailData);

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendOtp;