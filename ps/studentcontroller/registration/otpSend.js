var express = require('express');
var student = express();
var mongoose = require('mongoose');
var Student_Login = require('../../../models/student_login');
var email = require('emailjs');
var studentrouter = express.Router();
var currentdate = require('../../../config/currentdate')
var http = require('http');
var urlencode = require('urlencode');



var mailSender = email.server.connect({
    user: "testuserdmt@gmail.com",
    password: "Testuserdmt_1234",
    host: "smtp.gmail.com",
    ssl: true
});



exports.post = function(req, res) {

    Student_Login.findOne({$and:[{ "email.email": req.body.email },{"dateOfBirth.dob": req.body.dateOfBirth}]}, function(err, data) {
        if (!err) {
            if (data != null || data != undefined) {

                function randomString(length, chars) {
                var result = '';
                for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
                return result;
            }
            var tempCode1 = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            console.log(tempCode1)

                code=tempCode1
                lastModified = currentdate.currentdate();
                data.otp.push({code,lastModified});
                
                data.lastModified = currentdate.currentdate();

                data.save(function(err) {
                    if (!err) {

                        var message = {
                            text: "",
                            from: "Paperflow <testuserdmt@gmail.com>",
                            to: req.body.email,
                            subject: "Paperflow reset password",
                            attachment: [{
                                data: "<html>Dear,<br><p style='width:600px;'>We have received your forgot password request.</p>" +
                                    "You can change your password by using this otp: <strong>" + tempCode1 + "</strong><br><p style='width:600px;'>Once you login you will have to change your password.</p></html>",
                                alternative: true
                            }]
                        };
                        mailSender.send(message, function(err, data) {

                            res.json({ 'success': true, message: "Mail sent" });
                            res.end();
                        });
                    } else {
                        console.log(err)
                        res.json({ success: false });
                        res.end();
                    }
                });
            } else {
                res.json({ success: false, message: "User not exist" });
                res.end();
            }
        } else {
            res.json({ success: false, message: "User not exist" });
            res.end();
        }
    })

}
