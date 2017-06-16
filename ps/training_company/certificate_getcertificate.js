var express = require('express');
var util=require('../../../util.js');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_com_Register = require('../../../models/training_company');
var Student = require('../../../models/student');


exports.get = function(req, res) {

    var count = 0
    var da = [];


               
                    console.log(decoded.paperflowId)
                    Training_com_Register.findOne({ subuser: { $regex: decoded.paperflowId } }, function(err, dataa) {
                        //console.log(data)

                        if (!err) {

                            v = decoded.paperflowId
                                //console.log(v)

                            var values = v.split('/');


                            var s0 = values[0];
                            var s1 = values[1];
                            var s2 = values[2];
                            var s3 = values[3];
                            id = s0 + '/' + s1 + '/' + s2 + '/' + s3
                            console.log(id)

                            Training_com_Register.findOne({ paperflowId: { $regex: id } }, { student: 1, _id: 0 }, function(err, data) {
                                    console.log(data.student)
                                    for (x = 0; x < data.student.length; x++) {

                                        data1 = data.student[x].paperflowId;

                                        //console.log(data1)

                                        Student.findOne({ paperflowId: data1 }, function(err, studdata) {
                                            if (err) {
                                                res.json({ success: false, message: "err" })
                                            } else {


                                                da.push(studdata)
                                                console.log(da)
                                                    //if(count == data.student.length-1){
                                                if (++count == data.student.length) {

                                                    res.json({ success: true, data: da })
                                                    res.end()
                                                }

                                            }

                                            // count++

                                        }); //student

                                    } //for

                                }) //tr

                        } else {
                            res.json({ sucess: false, message: 'subuser not found' })
                        } //if
                    })
                } //else
             


