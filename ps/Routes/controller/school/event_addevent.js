var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var SchoolRegister = require('../../../models/school');

exports.post=function(req, res) {


token = req.headers.token;
                if (token) {
                    jwt.verify(token, 'superSecret', function(err, decoded) {


                        if (err) {
                            return res.status(401).send({ status: 401, message: 'Failed to authenticate token.' });

                            }
                            else {
                                SchoolRegister.findOne({ paperflowId: decoded.paperflowId }, function(err, eve) {
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
                                event_status = "false";


                                eve.event.push({event_name,start_date,end_date,description,location,participatingOrganization,responsiblePerson,issuingAuthority,verifyingAuthority,event_status})
                                eve.save(function(err) {
                                        if (err)
                                        {
                                        //res.send(err)
                                        res.json({success: false });
                                            res.end()
                                        }


                                        else
                                        {
                                            res.json({success: true, message: 'Event created' });
                                            res.end()
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
}