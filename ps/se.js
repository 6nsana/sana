var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var Student = require('../../models/student');
var TempStudent = require('../../models/tempstudent');
var Training_com_Register = require('../../models/training_company');
var Training_int_Register = require('../../models/training_ins');
var SchoolRegister = require('../../models/school');

exports.post = function(req, res) {
        var alterPromise;
        var namePromise;
        var priPromise

        var csv = function(temp) {


                //console.log(temp)
                temp.forEach(function(data) {
                            console.log(data)
                            console.log("--------------------")
                            //console.log(data.email[0].primary)
                            console.log("email", data.email[0].primary)
                            console.log(data.organization[0].typeOfOrganization)

                            console.log("hi", data.firstName)

                            console.log("hello", data.email[0].primary)
                            console.log("====================")
                            console.log(data.email[0].primary)


                            Student.findOne({ "email.primary": data.email[0].primary }, function(err, pri) {
                                    console.log("pri", pri)

                                    if (pri == null || pri == undefined || pri == '') {
                                        Student.findOne({ "email.alternate": data.email[0].primary }, function(err, mail) {
                                            if (mail == null || mail == undefined || mail == '') {
                                                Student.findOne({ $and: [{ firstName: data.firstName }, { "mother.motherFirstName": data.motherFirstName }, { "dateOfBirth.dob": data.dateOfBirth[0].dob }] }, function(err, name) {
                                                    if (name == null || name == undefined || name == '') {

                                                        paperflowId = "ST" + new Date().getTime();


                                                        Student.insertMany(data, function(err, sa) {
                                                            if (!err) {
                                                                console.log("save")

                                                            } else {
                                                                console.log(err)
                                                            }
                                                        })
                                                        if (data.organization[0].typeOfOrganization == 1 || data.organization[0].typeOfOrganization == 3) {
                                                            Training_com_Register.findOne({ paperflowId: data.organization[0].paperflowId }, function(err, data) {
                                                                data.student.push({ paperflowId })
                                                                data.save(function(err) {
                                                                    if (!err) {
                                                                        //res.json({ success: true, message: "Student not found. Create student" });
                                                                        console.log('student not found')
                                                                    } else {
                                                                        console.log(err)
                                                                        res.json({ success: false, message: 'Invalid data' });
                                                                    }

                                                                })
                                                            })
                                                        } else if (data.organization[0].typeOfOrganization == 2) {
                                                            Training_com_Register.findOne({ paperflowId: data.organization[0].paperflowId }, function(err, data) {
                                                                data.student.push({ paperflowId })
                                                                data.save(function(err) {
                                                                    if (!err) {
                                                                        //res.json({ success: true, message: "Student not found. Create student" });
                                                                        console.log('student not found')
                                                                    } else {
                                                                        console.log(err)
                                                                        res.json({ success: false, message: 'Invalid data' });
                                                                    }

                                                                })
                                                            })
                                                        } else if (data.organization[0].typeOfOrganization == 4) {
                                                            SchoolRegister.findOne({ paperflowId: data.organization[0].paperflowId }, function(err, data) {
                                                                data.student.push({ paperflowId })
                                                                data.save()
                                                            })
                                                        }
                                                    } else {

                                                        console.log("Student found by name");

                                                    }
                                                })
                                            } else {

                                                console.log("Student found by alternate email");

                                            }

                                        })
                                    } else {

                                        console.log("Student found by primary email.");

                                    }
                                })
                                }) //temp for each function
                        }




                        var tempPromise = TempStudent.find().exec()
                            //console.log("hi"+tempPromise)
                        tempPromise.then(function(t) {
                            //console.log("t"+t)
                            //t.forEach(function(temp) {

                            return csv(t)

                        }, function(err) {
                            console.log("err" + err)
                            return csv(0)

                            //})   
                        })
                        .then(function(response) {
                            //console.log(response)
                            //res.json(response)
                        }, function(response) {
                            //console.log("reject" + response)
                        })



                    } //exports
