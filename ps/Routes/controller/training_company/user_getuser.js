var express = require('express');
var util = require('../../../util.js');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_com_Register = require('../../../models/training_company');
var ContactRegister = require('../../../models/contact');

exports.get = function(req, res) {

    var count = 0;
    var da = [];

    Training_com_Register.findOne({ paperflowId: req.decoded.paperflowId },{ subuser: 1, _id: 0 }, function(err, dataa) {
        if (!err) {
            console.log(dataa)
            console.log(dataa.subuser.length)

            for (x = 0; x < dataa.subuser.length; x++) {

                data1 = dataa.subuser[x].paperflowId;
                console.log(data1)

                ContactRegister.findOne({ paperflowId: data1 },function(err, course) {
                    //console.log(course)

                    if (err) {
                        console.log(err)
                        res.json({ success: false });
                        res.end()
                    } else {

                        da.push(course)
                        console.log(da)

                        if (++count == dataa.subuser.length) {
                            res.json({ success: true, data: da })
                            res.end()
                        }


                    }
                    //count++
                })

            }
        } else {
            res.json({ success: false, message: 'error' })
        }
    })
}
