var express = require('express');
var util=require('../../../util.js');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_com_Register = require('../../../models/training_company');

exports.get=function(req, res) {

Training_com_Register.findOne({$and:[{paperflowId : decoded.paperflowId},{"course.status":"active"}]},{course:1,_id:0}, function(err, course) {

                                if (!err) {
                                 res.json({success:true,data:course})
                                  res.end()
                                    }
                                    else{
                                        res.json({success:false,message:'error'});
                                            res.end()
                                    }
                                    
                                });
                        }
                    
                
            
