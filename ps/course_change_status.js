var express = require('express');
var util=require('../../../util.js');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_com_Register = require('../../../models/training_company');


exports.post = function(req, res) {

    Training_com_Register.findOne({ $and: [{ "paperflowId": req.decoded.paperflowId }, { "course.courseName": req.body.courseName }] }, function(err, data) {

        if (data == null || data == undefined) {
            res.json({ success: false, message: 'course not found' })
        } else {
            Training_com_Register.update({ $and: [{ "paperflowId": req.decoded.paperflowId }, { "course.courseName": req.body.courseName }] }, { $set: { "course.$.status": req.body.status } }, function(err, data) {


                if (!err) {

                    res.json({ success: true, message: 'Status update' })
                    res.end()
                } else {
                    res.json({ success: false,message:'error' });
                    res.end()
                }
            })
        }
    })
}




//collection name
// var bulk = db.items.initializeUnorderedBulkOp();
// bulk.find( { status: "D" } ).update( { $set: { status: "I", points: "0" } } );
// bulk.find( { item: null } ).update( { $set: { item: "TBD" } } );
// bulk.execute();
