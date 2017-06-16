var express = require('express');
var student = express();
var mongoose = require('mongoose');
var studentrouter = express.Router();
var Student_Login = require('../../../models/student_login');

exports.post = function(req, res) {

    Student_Login.findOne({ token: req.headers.token }, function(err, user) {
        //console.log(user)


        if (err) {
            console.log(err);
            res.json({ success: false, message: err });
        } else if (user === null || undefined || "") {
            res.json({ success: false, message: 'unauthroized' });
        } else {

            if (!err) {
                //console.log(req.decoded.email)
                Student_Login.update({ "email.email": req.decoded.email }, { $unset: { token: req.headers.token } }, function(err, user) {


                    //Login.update({ "email.email": req.decoded.email },{ $unset:{token:""} }, function(err, user) {

                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        res.json({ success: true, message: 'Successfully Logout' })
                    }
                })
            } else {
                res.json({ success: true, message: err })
            }

            //})

        }
    });
}
