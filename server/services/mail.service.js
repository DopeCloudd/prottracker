const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const creds = require('../mail/credentials.json');

// Read HTML File
const htmlContent = fs.readFileSync('./mail/template/verifMail.html', 'utf8');

let transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
        user: creds.auth.user,
        pass: creds.auth.pass
    },
});

const sendVerificationEmail = async (user, verificationToken) => {
    // Set params
    const params = {
        name: user.name,
        verificationToken: verificationToken
    };
    const htmlContentParam = ejs.render(htmlContent, params);
    // Set options for sending mail
    let mailOptions = {
        from: 'noreply@myprottracker.com',
        to: user.email,
        subject: '[MYPROTTRACKER] Email verification',
        html: htmlContentParam,
    };
    try {
        await transporter.sendMail(mailOptions);
        return {success: true, message: "Email sent successfully"};
    } catch (error) {
        return {success: false, message: error.message};
    }
};

module.exports = {
    sendVerificationEmail
};