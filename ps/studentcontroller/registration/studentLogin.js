var express = require('express');
var student = express();
var macaddress = require('macaddress');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Register = require('../../../models/registration');
var Student_Login = require('../../../models/student_login');
var config = require('../../../config/config')
var studentrouter = express.Router();

exports.post = function(req, res) {
    Student_Login.findOne({ "email.email": req.body.email }, function(error, data) {
        if (error) {
            res.status(500).send({ status: 500, message: 'internal error' });
            res.end();
        } else {

            if (data && data.active == true) {


                Student_Login.aggregate([{ $match: { "email.email": req.body.email } }, { "$project": { "password": { "$slice": ["$password", -1] } } }], function(err, dataa) {
                       
                    if (dataa[0].password[0].password == req.body.password) {

                        data.lastModified=new Date()
                        var ip = req.ip.split(":");
                        var clientmac;
                        ipClient = ip[3];
                        
                        macaddress.one(function(err, mac) {
                            clientmac = mac
                        })

                        obj = { date: new Date(), ip: ipClient, mac: clientmac };
                        data.lastLogin.push(obj);
                        data.save();

                      

                        stoken = {
                         
                            paperflowId: data.paperflowId,
                            email: req.body.email,
                            active: data.active
                        }

                        //console.log("st",stoken)

                        var token = jwt.sign(stoken, config.superSecret, { expiresIn: '1d' });

                        Student_Login.update({ "email.email": req.body.email }, { $set: { token: token } }, function(err, loginuser) {
                            if (err) {
                                res.json({ success: false });
                                res.end();
                            } else {

                                res.set({'token': token});

                                var obj1 = { status: data.status }

                                res.json({ success: true, message: "login", data: obj1, token: token })
                                res.end();
                            }
                        })
                    } else {
                        res.json({ success: false, message: "Wrong Password" });
                        res.end();
                    }
                })
            } else {
                res.json({ success: false, message: "Email not found" });
                res.end();
            }
        }
    })
}
