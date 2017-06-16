var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_int_Register = require('../../../models/training_ins');


exports.post=function(req, res) {


token = req.headers.token;
                if (token) {
                    jwt.verify(token, 'superSecret', function(err, decoded) {


                        if (err) {
                            return res.status(401).send({ status: 401, message: 'Failed to authenticate token.' });

                            }
                            else {
                                Training_int_Register.findOne({ paperflowId: decoded.paperflowId }, function(err, cou) {
                                if (!err) {

                                    industryConnectStatus = req.body.industryConnectStatus;
                                    companyName = req.body.companyName;
                                    licenseNumber = req.body.license_number;
                                    moa = req.body.moa;

                                    courseName = req.body.courseName;
                                    status  = req.body.status ;
                                    field = req.body.field;
                                    courseContent = req.body.courseContent;
                                    courseDurationWeeks = req.body.course_duration_weeks;
                                    courseDurationHours = req.body.course_duration_hours;
                                    cou.course.push({courseName,status,field,courseContent,course_duration_weeks,course_duration_hours,industryConnectStatus,companyName,license_number,moa})

                                    cou.save(function(err) {
                                        if (err)
                                        {
                                        //res.send(err)
                                        res.json({success: false });
                                            res.end()
                                        }


                                        else
                                        {
                                            res.json({success: true, message: 'log' });
                                            res.end()
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
}

