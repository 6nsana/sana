var express = require('express');
var student = express();
var mongoose = require('mongoose');
var Student = require('../../../models/student');
var studentrouter = express.Router();


exports.post = function(req, res) {
    var stu = Student.find({ "email.primary": req.body.email }).exec()
    stu.then(function(data) {
    	//console.log(data)
        if (data == null || data == undefined||data == "") {
            res.json({ success: false, message: "Email not found" });
        } else {
            res.json({ success: true, message: "Email found" });
        }
    }, function(err) {
        res.json({ success: false, message: "Error" });
    })
}
