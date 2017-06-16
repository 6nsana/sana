var express = require('express');
var util=require('../../../util.js');
var app = express();
var mongoose = require('mongoose');

var router = express.Router();
var Training_com_Register = require('../../../models/training_company');



exports.post=function(req, res) {


            
                                Training_com_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, cou) {
                                if (!err) {

                                    industryConnectStatus = req.body.industryConnectStatus;
                                    companyName = req.body.companyName;
                                    licenseNumber = req.body.licenseNumber;
                                    moa = req.body.moa;

                                    courseName = req.body.courseName;
                                    status  = req.body.status ;
                                    field = req.body.field;
                                    courseContent = req.body.courseContent;
                                    courseDurationWeeks = req.body.courseDurationWeeks;
                                    courseDurationHours = req.body.courseDurationHours;
                                    cou.course.push({courseName,status,field,courseContent,courseDurationWeeks,courseDurationHours,industryConnectStatus,companyName,licenseNumber,moa })

                                    cou.save(function(err) {
                                        if (err)
                                        {
                                        //res.send(err)
                                        res.json({success: false, message:'Invalid data' });
                                            res.end()
                                        }


                                        else
                                        {
                                            res.json({success: true, message: 'successfully save course details' });
                                            res.end()
                                        }
                                    });
                                }
                                else{
                                    res.json({success: false, message:'Enable to find the user' });
                                    res.end()
                                }
                            });
                        }
                  
                



