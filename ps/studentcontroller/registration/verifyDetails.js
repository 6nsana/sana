var express = require('express');
var student = express();
var mongoose = require('mongoose');
var Student = require('../../../models/student');
var studentrouter = express.Router();
exports.post = function(req, res) {

    var stu = Student.findOne({
        $and: [{ "email.primary": req.body.email },
            { "firstName": req.body.firstName },
            { "middleName": req.body.middleName },
            { "lastName": req.body.lastName },
            { "father.fatherFirstName": req.body.fatherFirstName },
            { "father.fatherMiddleName": req.body.fatherMiddleName },
            { "father.fatherLastName": req.body.fatherLastName },
            { "mother.motherFirstName": req.body.motherFirstName },
            { "mother.motherMiddleName": req.body.motherMiddleName },
            { "mother.motherLastName": req.body.motherLastName },
            { "dateOfBirth.dob": req.body.dateOfBirth }
        ]
    }).exec()

    //console.log("stu", stu)

    stu.then(function(data) {
        console.log(data)
        if (data == null || data == undefined || data == "") {
            res.json({ success: false, message: "Not verified" });
        } else {
            res.json({ success: true, message: "Verified" });
        }
    }, function(err) {
        res.json({ success: false, message: "Error" });
    })


}
