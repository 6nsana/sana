var express = require('express');
var student = express();
var mongoose = require('mongoose');
var Student_Login = require('../../../models/student_login');
var currentdate = require('../../../config/currentdate')
var studentrouter = express.Router();

exports.put = function(req, res) {

    Student_Login.findOne({ "email.email": req.body.email }, function(err, logindata) {
        //console.log(regdata)
        Student_Login.aggregate([{ $match: { "email.email": req.body.email } }, { "$project": { "otp": { "$slice": ["$otp", -1] } } }], function(err, userdata) {
            console.log(userdata)
                console.log(userdata[0].otp[0].code)
                if (!err) {
                    if (userdata !== null) {

                        if (userdata[0].otp[0].code == req.body.otp) {
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
                            res.json({ "success": false, message: "OTP does not match" });
                            res.end();
                        }
                    } else {
                        res.json({ "success": false, message: "User not found!" });
                        res.end();
                    }
                } else {
                    res.json({ "success": false, message: "Error" });
                    res.end();
                }
            });
        })
    

}