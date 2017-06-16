var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Register = require('../../models/registration');
var Login = require('../../models/login');
var email = require('emailjs');
var router = express.Router();

var http = require('http');
var urlencode = require('urlencode');
var Hashids = require('hashids')
var hashSalt = new Hashids('PaperFlow forget password');



var mailSender = email.server.connect({
    user: "testuserdmt@gmail.com",
    password: "Testuserdmt_1234",
    host: "smtp.gmail.com",
    ssl: true
});



    exports.post=function(req, res) {
         Register.findOne({ email: req.body.email }, function(err, regdata) {

            Login.findOne({ email: req.body.email }, function(err, data) {
            if (!err) {
                if (data != null || data != undefined) {
                    var randomNum = Math.floor((Math.random() * 10000000) + 1000000);
                    var newPassword = hashSalt.encode(randomNum);
                    console.log(newPassword)  
                    data.password = newPassword;
                    regdata.password = newPassword;

                    regdata.save()
                    data.save(function(err) {
                        if (!err) {

                            var message = {
                                text: "",
                                from: "Paperflow <testuserdmt@gmail.com>",
                                to: req.body.email,
                                subject: "Paperflow reset password",
                                attachment: [{
                                    data: "<html>Dear,<br><p style='width:600px;'>We have received your password reset request.</p>" +
                                        "You can access your account by using the temporary password: <strong>" + newPassword + "</strong><br><p style='width:600px;'>Once you login you will have to change your password.</p></html>",
                                    alternative: true
                                }]
                            };
                            mailSender.send(message, function(err, data) {
                                
                                res.json({ 'success': true });
                                res.end();
                            });
                        } else {
                            res.json({ success: false });
                            res.end();
                        }
                    });
                } else {
                    res.json({ success: false, message: "user not exist" });
                    res.end();
                }
            } else {
                res.json({ success: false, message: "user not exist" });
                res.end();
            }
        })
    })
}


