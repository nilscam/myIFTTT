const router = require('express').Router();
const User = require('../../models/user-model').User;
const checkAuth = require('../../middleware/check-auth');
const addReaction = require('./twitterReaction').addReaction;
const request = require('request-promise');
const graph = require('@microsoft/microsoft-graph-client');
var outlook = require("node-outlook");
const func = require('../../function/office365/functions');

var queryParams = {
    '$select': 'Subject,ReceivedDateTime,From',
    '$orderby': 'ReceivedDateTime desc',
    '$top': 2
};

router.get('/test', checkAuth, async function (req, res) {
    var accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1zeE1KTUxDSURXTVRQdlp5SjZ0eC1DRHh3MCIsImtpZCI6Ii1zeE1KTUxDSURXTVRQdlp5SjZ0eC1DRHh3MCJ9.eyJhdWQiOiIwMDAwMDAwMi0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC85MDFjYjRjYS1iODYyLTQwMjktOTMwNi1lNWNkMGY2ZDlmODYvIiwiaWF0IjoxNTUwMjI3NTI4LCJuYmYiOjE1NTAyMjc1MjgsImV4cCI6MTU1MDIzMTQyOCwiYWNyIjoiMSIsImFpbyI6IjQySmdZTmlxMGZSbDRSRUIwNDFTR2Z2NjVmczhLMDl0TDc4Mk5TVjBsNWxmMjl5NDJnMEEiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiZThkYzQ3ZjgtYmFkYy00Y2Y5LWI4YzItZmRjYjgxMjEwZTEzIiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJSb3Vzc2VsIiwiZ2l2ZW5fbmFtZSI6IkJvcmlzIiwiaXBhZGRyIjoiODAuMTIuNjMuMTEzIiwibmFtZSI6ImJvcmlzIHJvdXNzZWwiLCJvaWQiOiI4MTllOTU2ZS0wODgzLTQ1NGQtOGIyZC05MWI4MmYxMTM5ZDEiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMTU1MjQzNTI3Ny0xNTk2NDk1Nzk1LTMwODk2MTM3MzEtMjkwODUiLCJwdWlkIjoiMTAwMzAwMDA5QTg0OTI0RiIsInNjcCI6IlVzZXIuUmVhZCIsInN1YiI6InE5ZVRZcVJqa2g1dThTeTZjZFN4VGVwV25PbnlvY0dTMHVqSWN3TlhRN2MiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiRVUiLCJ0aWQiOiI5MDFjYjRjYS1iODYyLTQwMjktOTMwNi1lNWNkMGY2ZDlmODYiLCJ1bmlxdWVfbmFtZSI6ImJvcmlzLnJvdXNzZWxAZXBpdGVjaC5ldSIsInVwbiI6ImJvcmlzLnJvdXNzZWxAZXBpdGVjaC5ldSIsInV0aSI6IndTWlk3eTNrSlVPSU9Cb3VWX0lXQUEiLCJ2ZXIiOiIxLjAifQ.fo0w3brI9cSzVrtjo5Vhk0RR6ScJ2BN2-0BUsCuTdruXVGUhyirQnAANZMCs5A2N-hnXv1nv0HhCPHilSOnU4zHyCcDscMX7MFlmbk_6hoBAsLAbqRvxlIvvcy82hitrbJ1-L1KYJ0cZv5iEcEJ3PQqaHrDWjwVA2Wo2EZJVpLSvWfpibnJ7m5P8Zso_711M1ldp0KWooLJJEsDHhuN78i49zduCKvPKp1QtK_l8LWeDwSKbyVH2KlGUhFbWAgR4LBwqoNm7njW8t_ZdIBSX3BKWa8SDfjDrGbGvkB5MoNOjaO2jUGB28Shdd_86JD_7aJeyrttK8VWQSEtSU6QsVg';
    // Set the API endpoint to use the v2.0 endpoint
    outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0');
    // Set the anchor mailbox to the user's SMTP address
    var email = "boris.roussel@epitech.eu";
    outlook.base.setAnchorMailbox(email);
    outlook.mail.getMessages({ token: accessToken, odataParams: queryParams },
        function (error, result) {
            if (error) {
                console.log('getMessages returned an error: ' + error);
            }
            else if (result) {
                console.log('getMessages returned ' + result.value.length + ' messages.');
                result.value.forEach(function (message) {
                    console.log('  Subject: ' + message.Subject);
                    var from = message.From ? message.From.EmailAddress.Name : "NONE";
                    console.log('  From: ' + from);
                    console.log('  Received: ' + message.ReceivedDateTime.toString());
                });
            }
        });

});

module.exports = router;