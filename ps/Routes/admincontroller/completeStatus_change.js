var express = require('express');
var admin = express();
var adminrouter = express.Router();
var mongoose = require('mongoose');
var Login = require('../../models/login');

Login.update({ paperflowId: req.body.paperflowId }, { $set: { status: '0', lastmodified: new Date() } }, function(err, daa) {
    if (err) {
        res.json({ success: false, message: 'status not change' })
    } else {
        res.json({ success: true, message: 'status change' })
    }
})
