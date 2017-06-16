var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_com_Register = require('../../../models/training_company');
var ContactRegister = require('../../../models/contact');

exports.get=function(req, res) {

                    token = req.headers.token;
                if (token) {
                    jwt.verify(token, 'superSecret', function(err, decoded) {
                        

                        if (err) {
                            return res.status(401).send({ status: 401, message: 'Failed to authenticate token.' });
                        
                            }
                            else {

//ContactRegister.findOne({$and:[{paperflowId : decoded.paperflowId},{"type":"verifer"}]}, function(err, course) {
ContactRegister.find({$and:[{paperflowId : decoded.paperflowId},{"authority_type": "sub user"}]}, function(err, course) {
                                if (!err) {
                                 res.json({success:true,data:course})
                                  res.end()
                                    }
                                    else{
                                        res.json({success:false,});
                                            res.end()
                                    }
                                });
                        }
                    });
                }
            }