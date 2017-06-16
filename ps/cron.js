var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var Student = require('./models/student');
var TempStudent = require('./models/tempstudent');
var cron = require('node-cron');

mongoose.Promise = global.Promise;


//var task = cron.schedule('* * * * *', function() {


var csv = function(data) {
        console.log(temp)

        return new Promise(function(resolve, reject) {

                temp.forEach(function(data) {



                        if (req.body.aadharCardNumber != 0) {

                            Student.findOne({ "aadharCard.aadharCardNumber": data.aadharCardNumber }, function(err, card) {
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
                                                                    resolve('student not found')
                                                                } else {
                                                                    resolve("Student found by name.");

                                                                }
                                                            })
                                                        } else {
                                                            resolve("Student found by alternate email.");

                                                        }

                                                    })
                                                } else {
                                                    resolve("Student found by primary email.");

                                                }
                                            })

                                        } else {
                                            resolve("Student found by government id .");
                                            res.end()
                                        }
                                    })
                                } else {

                                    resolve("Student found by aadhar card.");

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
                                                            resolve("Student not found.");
                                                        } else {

                                                            resolve("Student found by name");

                                                        }
                                                    })
                                                } else {

                                                    resolve("Student found by alternate email");

                                                }

                                            })
                                        } else {

                                            resolve("Student found by primary email.");

                                        }
                                    })
                                } else {

                                    resolve("Student found by government id .");

                                }
                            })
                        } else {
                            reject("err")
                        }
                    }) //for each
            }) //promise
    } //temp function



var tempPromise = TempStudent.find({}).exec()
console.log("hi"+tempPromise)
tempPromise.then(function(t) {
console.log("t"+t)
        return csv(t)

       }, function(err) {
        console.log("err" + err)
       return csv(0)
    }).then(function(response) {
            console.log(response)
        }, function(response) {
            console.log("reject" + response)
        })
    
    
    // })//cron
