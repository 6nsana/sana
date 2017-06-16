var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Register = require('../../models/registration');
var router = express.Router();


exports.post=function(req, res) {
	Register.findOne({ email: req.body.email }, function(err, data) {
                        if (data == null || data == undefined) {
                        	res.json({ success:false,message : "email not found" });
                        }
                        else {
                        	res.json({ success:true,message : "email found" });
                        }
                    })
}