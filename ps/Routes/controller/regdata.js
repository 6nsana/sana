var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Login = require('../../models/login');
var router = express.Router();


exports.get=function(req, res) {
	console.log(req.decoded)
	Login.findOne({ "paperflowId": req.decoded.paperflowId}, function(err, data) {
                        if (data == null || data == undefined) {
                        	res.json({ success:false,message : "email not found" });
                        }
                        else {
                        	Login.aggregate([{ $match: { paperflowId:req.decoded.paperflowId} }, { "$project": { "email": { "$slice": ["$email", -1] } } }],function(err,dataa){
                        		console.log(dataa)
                        	

                        	var obj1={_id:data._id,paperflowId:data.paperflowId,status:data.status,nameOfOrganization:data.nameOfOrganization,typeOfOrganization:data.typeOfOrganization,email:dataa[0].email}
                        	res.json({ success:true,data:obj1,token:data.token});
                        })
                        }
                    })
}