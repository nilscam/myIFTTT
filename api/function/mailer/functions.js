const User = require('../../models/user-model').User;
const request = require('request-promise');
const nodemailer = require('nodemailer');
const keys = require('../../config/keys');
const sortParams = require('../sortParams').sortParams;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: keys.nodemailer.mail,
        pass: keys.nodemailer.passMail,
    }
});

var mailerFunc = {
    sendMailer: function(params) {
        params = sortParams(params);
        return User.findOne({ _id: params.id }).then((currentUser) => {
            //var mailUser = currentUser.mail;
            mailUser = 'boris.roussel@epitech.eu';
            if (params.title == undefined) {
                var title = 'service: ' + params.triggerInfo
            } else {
                var title = 'service: ' + params.triggerInfo + ' - ' + params.title
            }
            var mailOption = {
                from: keys.nodemailer.mail,
                to: mailUser,
                subject: title,
                text: 'Mailer: Something new in this service ! \n\n' + params.text,
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