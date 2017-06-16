var express = require('express');
var student = express();
var mongoose = require('mongoose');
var Student_Login = require('../../../models/student_login');
var currentdate = require('../../../config/currentdate')
var studentrouter = express.Router();

exports.post = function(req, res) {

    Student_Login.findOne({ "email.email": req.decoded.email }, function(err, logindata) {

        var lastOtpObj = logindata.otp[logindata.otp.length - 1]
        var otpdata=lastOtpObj.code
            var lastpasswordobj = logindata.password[logindata.password.length - 1]
                //console.log(lastpasswordobj)
                var lastpassword=lastpasswordobj.password
        //console.log(regdata)
        Student_Login.aggregate([{ $match: { "email.email": req.decoded.email } }, { "$project": { "otp": { "$slice": ["$otp", -1] } } }], function(err, otpdata) {
            if (otpdata !== null) {

                if (otpdata[0].otp[0].code == req.body.otp) {
                    Student_Login.aggregate([{ $match: { "email.email": req.decoded.email } }, { "$project": { "password": { "$slice": ["$password", -1] } } }], function(err, userdata) {

                        //console.log(userdata[0].password[0].password)

                        if (userdata !== null) {

                            if (userdata[0].password[0].password == req.body.currentpassword) {
                                password = req.body.newpassword;
                                lastModified = currentdate.currentdate();
                                logindata.password.push({ password, lastModified })
                                logindata.lastModified = currentdate.currentdate();
                                logindata.save(function(err) {
                                    if (!err) {
                                        res.json({ "success": true, message: "Current Password Changed" });
                                        res.end();
                                    } else {
                                        res.json({ "success": false });
                                        res.end();
                                    }

                                });
                            } else {
                                res.json({ "success": false, message: "Current password does not match" });
                                res.end();
                            }
                        } else {
                            res.json({ "success": false, message: "User not found!" });
                            res.end();
                        }
                    })
                } else {
                    res.json({ "success": false, message: "OTP does not match" });
                    res.end();
                }
            } else {
                res.json({ "success": false, message: "User not found!" });
                res.end();
            }
        });
    })


}
