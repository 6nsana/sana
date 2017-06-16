var express = require('express');
var util=require('../../../util.js');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_com_Register = require('../../../models/training_company');

exports.post=function(req, res) {


                
                        
                                Training_com_Register.findOne({ paperflowId: decoded.paperflowId }, function(err, eve) {
                                if (!err) {

                                eventName =req.body.event_name
                                start_date=req.body.start_date
                                end_date=req.body.end_date
                                description=req.body.description
                                location=req.body.location
                                participatingOrganization =req.body.participatingOrganization
                                responsiblePerson=req.body.responsiblePerson
                                issuingAuthority=req.body.issuingAuthority
                                verifyingAuthority=req.body.verifyingAuthority

                                eve.event.push({event_name,start_date,end_date,description,location,participatingOrganization,responsiblePerson,issuingAuthority,verifyingAuthority})
                                eve.save(function(err) {
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
                    
            
