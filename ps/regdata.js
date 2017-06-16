var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Login = require('../../../models/login');
var Register = require('../../../models/registration');
var router = express.Router();


exports.get = function(req, res) {
    console.log(req.decoded)
    Login.findOne({ "paperflowId": req.decoded.paperflowId }, function(err, data) {
        if (data == null || data == undefined) {
            res.json({ success: false, message: "data not found" });
        } else {
            //Login.aggregate([{ $match: { paperflowId: req.decoded.paperflowId } }, { "$project": { "email": { "$slice": ["$email", -1] } } }], function(err, dataa) {
               Register.findOne({ "email.email": req.decoded.email }, function(err, dataa) {
                //console.log(dataa)
                if (!err)

                {
                    var obj1 = {
                        _id: data._id,
                        paperflowId: data.paperflowId,
                        status: data.status,
                        nameOfOrganization: data.nameOfOrganization,
                        typeOfOrganization: data.typeOfOrganization,
                        email: req.decoded.email,
                        addressLine1: dataa.addressLine1,
                        addressLine2: dataa.addressLine2,
                        city: dataa.city,
                        district: dataa.district,
                        pinCode: dataa.pinCode,
                        country: dataa.country,
                        state: dataa.state
                    }
                    res.json({ success: true, data: obj1, token: data.token });
                } else {
                    res.json({ success: false, message: "email not found" });
                }
            })
        }
    })
}
