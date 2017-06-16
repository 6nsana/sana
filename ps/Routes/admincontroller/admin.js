var express = require('express');
var admin = express();
var adminrouter = express.Router();

var mongoose = require('mongoose');
var Login = require('../../../models/login');


exports.get=function(req, res) {

Login.find({$and:[{"typeOfOrganization" : "001"},{"status" : "5"}]},function(err,data){

})
}


