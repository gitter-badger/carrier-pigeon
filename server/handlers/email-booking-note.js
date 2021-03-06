"use strict"

var pdf          = require('html-pdf');
var fs           = require('fs');
var parseData    = require('../lib/get-form-data.js');
var validateUser = require('../lib/validate-user.js');

var api_key = process.env.MAIL_GUN_API_KEY || require("../../credentials.json").mailGunApiKey;
var domain = process.env.MAIL_GUN_DOMAIN || require("../../credentials.json").mailGunDomain;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function sendBookingNote (attachment, email) {
    var data = {
        from: 'Coot Freight Ltd <app@cootfreight.co.uk>',
        to: email,
        subject: 'Booking Note from Coot Freight',
        html: require('../email/booking-note.js')(),
        attachment: attachment
    }
    mailgun.messages().send(data, function (err, body) {
        err
        ? console.log(err)
        : console.log(body)
    });
}

function emailBookingNote (req, res, cb) {
    validateUser(req, res, function() {
        parseData(req, function(data) {
            pdf.create(data.attachment).toBuffer(function(err, buffer) {
                if (err) {
                    return console.log(err);
                }
                sendBookingNote(buffer, data.email);
                res.writeHead(200);
                res.end();
            });
        })
    });
};

module.exports = emailBookingNote;