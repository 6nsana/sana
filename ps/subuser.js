var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var Training_com_Register = require('../../../models/training_company');
var Login = require('../../../models/login');
var ContactRegister = require('../../../models/contact');

exports.post = function(req, res) {

    var co;
	var filter = {};
    filter.organizationPaperflowId= req.decoded.paperflowId;
    console.log(req.decoded.paperflowId)
    if (req.body.subuserType) {
        filter.subuserType = req.body.subuserType;
    }
    console.log(filter)

	var size = parseInt(req.params.size);
    var page = parseInt(req.params.page) - 1;
    var skip = size * page;

    var countPromise = ContactRegister.count({$and:[{"authorityType": "Sub User"}, filter]}).exec();
    countPromise.then(function(count){
		co=count;
	},function(err){
		console.log(err)
	})



var contact=ContactRegister.find({$and:[{"authorityType": "Sub User"}, filter]}).skip(skip).limit(size).exec();

	contact.then(function(contactdetails){
		res.json({success:true,documentSize:co,data:contactdetails})
	},function(err){
		res.json({suucess:false,message:err})
	})
}
