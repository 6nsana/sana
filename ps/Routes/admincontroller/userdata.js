var express = require('express');
var admin = express();
var adminrouter = express.Router();
var mongoose = require('mongoose');
var Login = require('../../models/login');
var ContactRegister = require('../../models/contact');
var Training_com_Register = require('../../models/training_company');
var Training_int_Register = require('../../models/training_ins');
var SchoolRegister = require('../../models/school');

exports.post = function(req, res) {
    if (req.body.typeOfOrganization == 001) {
        Training_com_Register.findOne({ paperflowId: req.body.paperflowId }, function(err, data) {
            if (!err) {
                ContactRegister.findOne({ organizationPaperflowId: req.body.paperflowId }, function(err, dataa) {
                    if (!err) {
                        var obj1 = { organizationdetails: data, contactparsondetails: dataa }
                        res.json({ success: true, data: obj1 })
                    }
                })

            }
        })

    } else if (req.body.typeOfOrganization == 002) {
        Training_int_Register.findOne({ paperflowId: req.body.paperflowId }, function(err, data) {
            if (!err) {
                ContactRegister.findOne({ organizationPaperflowId: req.body.paperflowId }, function(err, dataa) {
                    if (!err) {
                        var obj1 = { organizationdetails: data, contactparsondetails: dataa }
                        res.json({ success: true, data: obj1 })
                    }
                })

            }

        })

    } else if (req.body.typeOfOrganization == 003) {
        Training_com_Register.findOne({ paperflowId: req.body.paperflowId }, function(err, data) {
            if (!err) {
                ContactRegister.findOne({ organizationPaperflowId: req.body.paperflowId }, function(err, dataa) {
                    if (!err) {
                        var obj1 = { organizationdetails: data, contactparsondetails: dataa }
                        res.json({ success: true, data: obj1 })
                    }
                })

            }

        })

    } else if (req.body.typeOfOrganization == 004) {
        SchoolRegister.findOne({ paperflowId: req.body.paperflowId }, function(err, data) {
            if (!err) {
                ContactRegister.findOne({ organizationPaperflowId: req.body.paperflowId }, function(err, dataa) {
                    if (!err) {
                        var obj1 = { organizationdetails: data, contactparsondetails: dataa }
                        res.json({ success: true, data: obj1 })
                    }
                })

            }

        })

    } else {
        res.json('no organization')
    }


}
