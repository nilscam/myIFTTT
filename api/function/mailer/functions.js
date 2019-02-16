const User = require('../../models/user-model').User;
const request = require('request-promise');
const nodemailer = require('nodemailer');
const keys = require('../../config/keys');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: keys.nodemailer.mail,
        pass: keys.nodemailer.passMail,
    }
});

var mailerFunc = {
    sendMailer: function (req, serviceName, textMail) {
        return User.findOne({ _id: req.userData.userId }).then((currentUser) => {
            //var mailUser = currentUser.mail;
            mailUser = 'boris.roussel@epitech.eu';
            var mailOption = {
                from: keys.nodemailer.mail,
                to: mailUser,
                subject: 'services: ' + serviceName,
                text: textMail,
            }
            return (mailOption);
        }).then(function (mailOptions) {
            return new Promise(function (resolve, reject) {
                if (mailOptions.to != null && mailOptions.to != '') {
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            resolve(false);
                        } else {
                            resolve(true);
                            console.log('Email sent: ' + info.response);
                        }
                    });
                } else {
                    resolve(false);
                }
            }).then(value => {
                return value;
            });
        }).then(value => {
            return value;
        });
    },
};

module.exports = mailerFunc;