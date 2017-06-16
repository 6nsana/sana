var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Register = require('../../models/registration');
var Login = require('../../models/login');
var email = require('emailjs');
var router = express.Router();

var http = require('http');
var urlencode = require('urlencode');



var mailSender = email.server.connect({
    user: "testuserdmt@gmail.com",
    password: "Testuserdmt_1234",
    host: "smtp.gmail.com",
    ssl: true
});
    

exports.post=function(req, res) {
            var email = req.body.email;
            Register.findOne({ email: req.body.email }, function(err, userData) {
                if (!err) {
                    if (userData !== null) {
                        function randomString(length, chars) {
                            var result = '';
                            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
                            return result;
                        }
                        var tempCode1 = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                        console.log(tempCode1)


                        Register.update({ email: req.body.email }, { $set: { verifyCode: tempCode1 } }, function(err, data) {
                            if (err) {
                                res.json({ success: false, message: "verify code not sent" });
                                res.end();
                            } else {//sms


                                    // var msg = urlencode('One Time password (OTP) ' + tempCode1);
                                    // var number = req.body.mobileNumberCode+req.body.mobilenumber;
                                    // var username = 'query@zenways.io';
                                    // var hash = 'Textlocal_123';
                                    // var sender = 'txtlcl';
                                    // var data = 'username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=' + number + '&message=' + msg
                                    // var options = {
                                    //     host: 'api.textlocal.in',
                                    //     path: '/send?' + data
                                    // };

                                    // callback = function(response) {
                                    //     var str = '';
                                    //     response.on('data', function(chunk) {
                                    //         str += chunk;
                                    //     });
                                    //     response.on('end', function() {
                                    //         console.log(str);
                                    //     });
                                    // }

                                    // http.request(options, callback).end();



                                    //email

                                    var message = {
                                        text: "",
                                        from: "PaperFlow <testuserdmt@gmail.com>",
                                        to: req.body.email,
                                        subject: "PaperFlow Account Verification",
                                        attachment: [{
                                            data: "<html>Hi,<br><h2>Thank you for registering with PaperFlow.</h2><br>" +
                                                "Please use the verificatation code below in order to complete your registration.<br>" +
                                                "Code: <strong> " + tempCode1 +
                                                "</strong></html>",
                                            alternative: true
                                        }]
                                    };
                                    mailSender.send(message, function(err, data) {
                                        // console.log(err)
                                        res.json({ success: true, message: "verifycode sent success" });
                                        res.end();
                                    })
                              
                                
                            }
                        })


                    } else {
                        res.json({ success: false, message: "user not found" });
                        res.end();
                    }
                } else {
                    res.json({ success: false, message: "error" });
                    res.end();
                }
            })
}


