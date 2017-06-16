var express = require('express');
var student = express();
var mongoose = require('mongoose');
var Student_courses = require('../../../models/studentcourses');

var studentrouter = express.Router();

exports.post = function(req, res) {
    //console.log(req.decoded)

    var studentCoursesDetails = Student_courses.find({ studentId: req.body.studentId }).exec()
    studentCoursesDetails.then(function(details) {
//console.log(details)

        var fdata = details.map(function(data) {
        	//console.log(data)
        	//console.log(data.finalCertificateObj)
            return (data.finalCertificateObj)
        })
        res.json({ sucess: true, data: fdata })
        res.end()
    }, function(err) {
        res.json({ success: false, data: err })
        res.end()
    })
}
