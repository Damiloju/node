const sgMail = require("@sendgrid/mail");
const sendgridAPIKey =
    "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";

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "yusufdamiloju@gmail.com",
        subject: "Thanks for joining in!",
        text: `Welcome to the app ${name}. Let me know how you get along with the app`
    });
};

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "yusufdamiloju@gmail.com",
        subject: "You just canceled :(",
        text: `Goodbye ${name}. I hope to see you back soon!`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
};