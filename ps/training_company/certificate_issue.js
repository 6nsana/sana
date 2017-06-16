var express = require('express');
var util=require('../../../util.js');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var ContactRegister = require('../../../models/contact');
var Training_com_Register = require('../../../models/training_company');
var Student = require('../../../models/student');

exports.post = function(req, res) {
                Training_com_Register.findOne({ subuser: { $elemMatch:{paperflowId:req.decoded.paperflowId}} }, function(err, data) {
                //Training_com_Register.findOne({ subuser: { $regex: req.decoded.paperflowId } }, function(err, data) {
                    //console.log(req.decoded.paperflowId)
                    console.log(data)
                    
                    if (data !=null||data != undefined) {

                    ContactRegister.findOne({paperflowId:req.decoded.paperflowId},function(err, su) {
                                //console.log(su)
                                if(su.notissueto.paperflowId==req.body.paperflowId)
                                {
                                    res.json({sucess:false,message:'same person'})
                                }
                                else
                                {
                                    Student.update({$and:[{"paperflowId" :req.body.paperflowId},{"certificate.courseName":req.body.courseName}]},{$set:{"certificate.$.certStatus":"true"}},function(err, s) {
                                   
                                        if(!err)
                                        {
                                           res.json({sucess:true,message:'status changed'}) 
                                        }
                                        else{
                                            console.log(err)
                                            res.json({sucess:false,message:'status changed not changed'}) 
                                        }
                                    })
                                }
                            })
                    }else{
                        res.json({sucess:false, message:'subuser not found'})
                    }
                })
            }//else
        