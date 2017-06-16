var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Register = require('../../models/registration');
var Login = require('../../models/login');
var macaddress = require('macaddress');
var email = require('emailjs');
var router = express.Router();


var mailSender = email.server.connect({
    user: "testuserdmt@gmail.com",
    password: "Testuserdmt_1234",
    host: "smtp.gmail.com",
    ssl: true
});


exports.post=function(req, res) {

        var register = new Register();
        register.typeOfOrganization = req.body.typeOfOrganization;
        register.nameOfOrganization=req.body.nameOfOrganization;
        email = req.body.email;
        lastmodified=new Date;
        register.email.push({email,lastmodified});

        mobileNumberCode = req.body.mobileNumberCode;
        mobileNumber = parseInt(req.body.mobileNumber);
        register.mobile.push({mobileNumberCode,mobileNumber,lastmodified});

        password = req.body.password;
        register.password.push({password,lastmodified})
        register.country = req.body.country;
        register.state = req.body.state;
        

        register.ipAddress = req.connection.remoteAddress;

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        var tempCode1 = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        console.log(tempCode1)
        register.verifyCode = tempCode1;
        register.verified = "No";


        macaddress.one(function(err, mac) {
            console.log("Mac address for this host: %s", mac);
            register.macAddress = mac;

        });


       


        Login.findOne({ email: req.body.email }, function(err, data) {
            if (data == null || data == undefined) {

                Register.findOne({ email: req.body.email }, function(err, data) {
                        if (data == null || data == undefined) {



                            register.save(function(err) {
                                if (err) {
                                    console.log(err)
                                    res.status(406).send({ status: -2, message: 'Invaild data' })
                                    //res.json({ success:false ,message : "Invaild data" });
                                    res.end();
                                } else {
                                    //sms


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
                                        res.status(200).send({status:2, success: true, message:"registration successful and verificatation required" })
                                        //res.json({ success: true, message:"registration successful"});
                                        res.end();
                                    })
                              

                                }
                             })

                        } else {

                            Register.remove({ email: req.body.email }, function(err) {
                                if (!err) {

                                    register.save(function(err) {
                                        if (err) {
                                            res.status(406).send({ status: -2, message: 'Invaild data' })
                                            //res.json({ success: false,message : "Invaild data" });
                                            res.end();
                                        } else {

                                            //sms 

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



                                            // //email

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
                                                res.status(200).send({status:2, success: true, message:"registration successful and verificatation required" })
                                                res.end();
                                            })


                                        }
                                    })
                                } else {
                                    res.json({ success: false, message: "you cannot register!, already exist" });
                                    res.end();
                                }
                            })

                        } //else

                    }) // register
            } else {
                res.json({ success: false, message: "you cannot register!, already exist" });
                res.end();
            }

        })

}
