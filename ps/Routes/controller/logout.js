
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Login = require('../../models/login');

exports.get=function(req, res) {

              Login.findOne({ token: req.headers.token }, function(err, user) {

                  if (err) {
                      console.log(err);
                      res.json({ success: false, message: err });
                  } 
                  else if (user === null || undefined || "") {
                      res.json({ success: false, message: 'unauthroized' });
                  } 
                  else {

                      jwt.verify(req.headers.token, 'superSecret', function(err, decoded) {
                          if (!err) {
                              Login.update({ email: decoded.email }, { $unset: { token: req.headers.token } }, function(err, user) {

                                  if (err) {
                                      res.json({ success: false, message: err });
                                  } else {
                                      res.json({ success: true, message: 'successfully logout' })
                                  }
                              })
                                  } 
                          else {
                              res.json({ success: true, message: err })
                                }

                          })

                        }
                    });
                  }
