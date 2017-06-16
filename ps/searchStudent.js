var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var Student = require('../../../models/student');

exports.post = function(req, res) {


if (req.body.aadharCardNumber != 0){

        Student.findOne({ "aadharCard.aadharCardNumber": req.body.aadharCardNumber }, function(err, card) {
            //console.log(card)
            if (card == null || card == undefined || card == "") {
                Student.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, gov) {
                    // console.log(gov.governmentIdNumber)
                    if (gov == null || gov == undefined || gov == '') {
                        Student.findOne({ "email.primary": req.body.primaryEmail }, function(err, pri) {
                            //console.log(pri)
                            //console.log(pri.primaryEmail)
                            if (pri == null || pri == undefined || pri == '') {
                                Student.findOne({ "email.alternate": req.body.alternateEmail }, function(err, mail) {
                                    if (mail == null || mail == undefined || mail == '') {
                                        Student.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName }, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, name) {
                                            if (name == null || name == undefined || name == '') {
                                                res.json('student not found')
                                            } else {
                                                res.json({ success: true, message: "Student found by name." });
                                                res.end()
                                            }
                                        })
                                    } else {
                                        res.json({ success: true, message: "Student found by alternate email." });
                                        res.end()
                                    }

                                })
                            } else {
                                res.json({ success: true, message: "Student found by primary email." });
                                res.end()
                            }
                        })

                    } else {
                        res.json({ success: true, message: "Student found by government id ." });
                        res.end()
                    }
                })
            } else {

                res.json({ success: true, message: "Student found by aadhar card." });
                res.end()
            }
        })
    } else if (req.body.aadharCardNumber == 0) {

        Student.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, gov) {

            if (gov == null || gov == undefined || gov == '') {
                Student.findOne({ "email.primary": req.body.primaryEmail }, function(err, pri) {

                    if (pri == null || pri == undefined || pri == '') {
                        Student.findOne({ "email.alternate": req.body.alternateEmail }, function(err, mail) {
                            if (mail == null || mail == undefined || mail == '') {
                                Student.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName }, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, name) {
                                    if (name == null || name == undefined || name == '') {
                                        res.json({ success: true, message: "Student not found." });
                                    } else {

                                        res.json({ success: true, message: "Student found by name" });
                                        res.end()
                                    }
                                })
                            } else {

                                res.json({ success: true, message: "Student found by alternate email" });
                                res.end()
                            }

                        })
                    } else {

                        res.json({ success: true, message: "Student found by primary email." });
                        res.end()
                    }
                })
            } else {

                res.json({ success: true, message: "Student found by government id ." });
                res.end()
            }
        })


    }
}
