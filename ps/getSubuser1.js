var express = require('express');
var admin = express();
var mongoose = require('mongoose');
var adminrouter = express.Router();
var Training_com_Register = require('../../models/training_company');
var ContactRegister = require('../../models/contact');

exports.post = function(req, res) {
     var contactdet=[];
    var co;
	var filter = {};
	
	  if (req.body.filter) {
        filter = req.body.filter;
    }


    //console.log("inal",filter)

	var size = parseInt(req.params.size);
    var page = parseInt(req.params.page) - 1;
    var skip = size * page;

    var countPromise = ContactRegister.count({$and:[{"authorityType": "Sub User"}, filter]}).exec();
    countPromise.then(function(count){
		co=count;
	},function(err){
		console.log(err)
	})



var contactPromise=ContactRegister.find({$and:[{"authorityType": "Sub User"}, filter]}).skip(skip).limit(size).exec();

	contactPromise.then(function(contactdetails){
		contactdet.push(contactdetails)
		//res.json({success:true,documentSize:co,data:contactdetails})

	},function(err){
		//res.json({suucess:false,message:err})
		console.log(err)
	})


Promise.all([countPromise,contactPromise]).then(function(pre){
	res.json({success:true,documentSize:co,data:contactdet})
	},function(err){
		res.json({suucess:false,message:err})
		//console.log(err)
})



}