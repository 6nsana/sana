var express = require('express');
var student = express();
var mongoose = require('mongoose');
var Student = require('../../../models/student');
var currentdate = require('../../../config/currentdate')
var studentrouter = express.Router();

exports.get = function(req, res) {
	console.log(req.decoded)

 var profileDetails=Student.findOne({ "email.primary": req.decoded.email }).exec()
 profileDetails.then(function(details){
 	res.json({sucess:true,data:details})
 },function(err){
 	res.json({success:false,data:err})
 })
}