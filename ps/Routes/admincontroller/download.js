var express = require('express');
var admin = express();
var adminrouter = express.Router();
var mongoose = require('mongoose');

exports.post=function(req,res){
  console.log(req.body.vpath)

  var vpath=req.body.vpath;
  console.log(vpath)

  res.sendFile(path.resolve(req.body.path));



}


exports.get=function(req,res){
  // console.log(req.body.vpath)

  // var vpath=req.body.vpath;
  // console.log(vpath)

  res.sendFile(path.resolve('uploads/userPhoto-1487444233125.json'));



}