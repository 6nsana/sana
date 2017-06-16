var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_int_Register = require('../../../models/training_ins');

exports.get=function(req, res) {

                    token = req.headers.token;
                if (token) {
                    jwt.verify(token, 'superSecret', function(err, decoded) {


                        if (err) {
                            return res.status(401).send({ status: 401, message: 'Failed to authenticate token.' });
                         //return res.json({ success: false, message: 'Failed to authenticate token.' });
                            }
                            else {


Training_int_Register.findOne({$and:[{paperflowId : decoded.paperflowId},{"course.status":"active"}]},{course:1,_id:0}, function(err, course) {

                                if (!err) {
                                  res.json({success: true,data:course });
                                            res.end()
                                    }
                                    else{
                                        res.json({success: false });
                                            res.end()
                                    }
                                });
                        }
                    });
                }
            }
