var express = require('express');
var student = express();
var mongoose = require('mongoose');
var Student_Login = require('../../../models/student_login');
var currentdate = require('../../../config/currentdate')
var studentrouter = express.Router();

exports.post = function(req, res) {
	if(req.body.socialName=="facebook"){

var stu=Student_Login.update({"email.email":req.body.email},{$set:{"facebook.id":req.body.id,"facebook.token":req.body.token,lastModified:currentdate.currentdate()}})
	stu.then(function(data){
	
		res.json({ success: true, message: "Detail save"})
	},function(err){
		res.json({ success: false, message: "Error"})
	
})

}else if(req.body.socialName=="google"){
	var stu=Student_Login.update({"email.email":req.body.email},{$set:{"google.id":req.body.id,"google.token":req.body.token,lastModified:currentdate.currentdate()}})
	stu.then(function(data){
	
		res.json({ success: true, message: "Detail save"})
	},function(err){
		res.json({ success: false, message: "Error"})
	
})

}else if(req.body.socialName=="linkedin"){
	var stu=Student_Login.update({"email.email":req.body.email},{$set:{"linkedin.id":req.body.id,"linkedin.token":req.body.token,lastModified:currentdate.currentdate()}})
	stu.then(function(data){
	
		res.json({ success: true, message: "Detail save"})
	},function(err){
		res.json({ success: false, message: "Error"})
	
})

}else{
	res.json({ success: false, message: "No such social login"})
}
}