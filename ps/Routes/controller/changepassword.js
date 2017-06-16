var express = require('express');
var util=require('../../util.js');
var app = express();
var mongoose = require('mongoose');
var Register = require('../../models/registration');
var Login = require('../../models/login');

var router = express.Router();



    exports.post=function(req, res) {
       
                    Register.findOne({ "email.email": req.decoded.email[0].email }, function(err, regdata) {
                    Login.findOne({ "email.email": req.decoded.email[0].email }, function(err, userdata) {
                        if (!err) {
                            if (userdata !== null) {

                                if (userdata.password[0].password == req.body.currentpassword) {
                                    password = req.body.newpassword;
                                    lastmodified=new Date
                                    regdata.password.push({password,lastmodified})
                                    regdata.save()
                                    password = req.body.newpassword;
                                    lastmodified=new Date
                                    userdata.password .push({password,lastmodified})
                                    userdata.save(function(err) {
                                        if (!err) {
                                            res.json({ "success": true ,message: "current password changed"});
                                            res.end();
                                        } else {
                                            res.json({ "success": false });
                                            res.end();
                                        }

                                    });
                                } else {
                                    res.json({ "success": false, message: "current password does not match" });
                                    res.end();
                                }
                            } else {
                                res.json({ "success": false, message: "user not found!" });
                                res.end();
                            }
                        } else {
                            res.json({ "success": false, message: "user not found!" });
                            res.end();
                        }
                    });
                });

                }
            