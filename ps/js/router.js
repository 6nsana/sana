var express = require('express');
var app = express();
var mongoose = require('mongoose');


// Load the SDK for JavaScript
var AWS = require('aws-sdk');

// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');


var router = express.Router();

router.route('/register').post(function(req,res) {












	module.exports = router;