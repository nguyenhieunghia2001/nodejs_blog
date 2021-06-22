const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: MAILER_HOST,
    port: MAILER_PORT,
    secure: MAILER_SECURE, // true for 465, false for other ports
    auth: {
        user: MAILER_USER, // generated ethereal user
        pass: MAILER_PASSWORD, // generated ethereal password
    },
});

// send mail with defined transport object
exports.sendMail = (email, subject, text, html) => {
    try {
        const content = await transporter.sendMail({
            from: '"Lotteria Movie" <lotteria@mail.com>', // sender address
            to: email, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });
        console.log('Message sent: %s', content.messageId);
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
};