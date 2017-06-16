var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var Student = require('../../models/student');
var TempStudent = require('../../models/tempstudent');


exports.post = function(req, res) {


        var csv = function(temp) {
          
            temp.forEach(function(dat) {
                        console.log("hello", dat.email[0].primary)
                        var result=getuser(dat)
                        console.log("result----",result)
                          })
        }




         function getuser(data){
            console.log(data)
             //data1.forEach(function(data) {
                        Student.findOne({ "email.primary": data.email[0].primary }, function(err, pri) {
                            console.log("pri", pri)

                            if (pri == null || pri == undefined || pri == '') {
                                Student.findOne({ "email.alternate": data.email[0].primary }, function(err, mail) {
                                    if (mail == null || mail == undefined || mail == '') {
                                        Student.findOne({ $and: [{ firstName: data.firstName }, { "father.fatherFirstName": data.fatherFirstName }, { "mother.motherFirstName": data.motherFirstName }, { "dateOfBirth.dob": data.dateOfBirth[0].dob }] }, function(err, name) {
                                            if (name == null || name == undefined || name == '') {
                                                Student.insertMany(data, function(err, sa) {
                                                    if (!err) {
                                                        console.log("jk")
                                                        return(sa)
                                                    } else {
                                                        console.log(err)
                                                        return(err)
                                                    }
                                                })
                                            } else {

                                                return("Student found by name");

                                            }
                                        })
                                    } else {

                                        return("Student found by alternate email");

                                    }

                                })
                            } else {

                                return("Student found by primary email.");

                            }
                        })
                    //})
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
        }).then(function(response) {
            console.log(response)
                //res.json(response)
        }, function(response) {
            console.log("reject-----" + response)
        })



    } //exports
