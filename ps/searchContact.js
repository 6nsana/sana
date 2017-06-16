var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var Student = require('../../../models/student');

exports.post = function(req, res) {

    if (req.body.aadharCardNumber != null)

    {

        ContactRegister.findOne({ aadharCardNumber: req.body.aadharCardNumber }, function(err, cardd) {
            console.log(cardd)


            if (cardd == null || cardd == undefined || cardd == "") {
                ContactRegister.findOne({ governmentIdNumber: req.body.governmentIdNumber }, function(err, govv) {
                    // console.log(gov.governmentIdNumber)
                    if (govv == null || govv == undefined || govv == '') {
                        ContactRegister.findOne({ "email.primary": req.body.primaryEmail }, function(err, prii) {
                            //console.log(pri)
                            //console.log(pri.primaryEmail)
                            if (prii == null || prii == undefined || prii == '') {
                                ContactRegister.findOne({ "email.alternate": req.body.alternateEmail }, function(err, maill) {
                                    if (maill == null || maill == undefined || maill == '') {
                                        ContactRegister.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName }, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, namee) {
                                            if (namee == null || namee == undefined || namee == '') {
                                                res.json({ success: true, message: "person not found as subuser" })
                                            } else {
                                                res.json({ success: true, message: "found by name " });
                                                res.end()
                                            }
                                        })
                                    } else {
                                        res.json({ success: true, message: "found by alter mail" });
                                        res.end()
                                    }
                                })
                            } else {
                                res.json({ success: true, message: "found by pri mail" });
                                res.end()
                            }
                        })

                    } else {
                        res.json({ success: true, message: "found by governmentIdNumber" });
                        res.end()
                    }
                })
            } else {
                res.json({ success: true, message: "found by aadhar" });
                res.end()
            }
        })
    } else if (req.body.aadharCardNumber == null) {

        ContactRegister.findOne({ governmentIdNumber: req.body.governmentIdNumber }, function(err, govv) {
            // console.log(gov.governmentIdNumber)
            if (govv == null || govv == undefined || govv == '') {
                ContactRegister.findOne({ "email.primary": req.body.primaryEmail }, function(err, prii) {
                    //console.log(pri)
                    //console.log(pri.primaryEmail)
                    if (prii == null || prii == undefined || prii == '') {
                        ContactRegister.findOne({ "email.alternate": req.body.alternateEmail }, function(err, maill) {
                            if (maill == null || maill == undefined || maill == '') {
                                ContactRegister.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName }, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, namee) {
                                    if (namee == null || namee == undefined || namee == '') {
                                        res.json({ success: true, message: "person not found as subuser" })
                                    } else {

                                        res.json({ success: true, message: "found by name  " });
                                        res.end()
                                    }
                                })
                            } else {
                                res.json({ success: true, message: "found by alter mail " });
                                res.end()
                            }
                        })
                    } else {
                        res.json({ success: true, message: "found by pri mail" });
                        res.end()
                    }
                })
            } else {
                res.json({ success: true, message: "found by governmentIdNumber" });
                res.end()
            }
        })


    }
}
