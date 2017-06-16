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


                            Training_int_Register.findOne({$and:[{"paperflowId" : decoded.paperflowId},{"course.courseName":req.body.courseName}]},function(err,data){

                                            if(data ==null ||data == undefined){
                                                    res.json({success:false, message: 'course not found' })
                                                }

                                            else{
                                                    Training_int_Register.update({$and:[{"paperflowId" : decoded.paperflowId},{"course.courseName":req.body.courseName}]},{$set:{"course.$.status":req.body.status}},function(err,data){


                                                                           if (!err) {

                                                                                  res.json({success:true, message: 'Status update' })
                                                                                  res.end()
                                                                                    }
                                                                                    else{
                                                                                    res.json({success:false});
                                                                                            res.end()
                                                                                    }
                                                               })
                                                }
                                          })
                            }
                        })
                        }
                    }



                        