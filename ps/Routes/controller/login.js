var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Register = require('../../models/registration');
var Login = require('../../models/login');
var macaddress = require('macaddress');
var jwt = require('jsonwebtoken');
var config = require('../../config/config')
var router = express.Router();



router.route('/login')
exports.post = function(req, res) {
    Login.findOne({ "email.email": req.body.email }, function(error, data) {
        if (error) {
            res.status(500).send({ status: 500, message: 'internal error' });
            res.end();
        } else {

            if (data && data.active == true) {


                Login.aggregate([{ $match: { "email.email": req.body.email } }, { "$project": { "password": { "$slice": ["$password", -1] } } }], function(err, dataa) {
                        //console.log(dataa[0].password[0].password)
                    if (dataa[0].password[0].password == req.body.password) {


                        var ip = req.ip.split(":");
                        var clientmac;
                        ipClient = ip[3];

                        macaddress.one(function(err, mac) {
                            clientmac = mac
                        })

                        obj = { date: new Date(), ip: ipClient, mac: clientmac };
                        data.lastLogin.push(obj);
                        data.save();

                        // Profile.update({ email: req.body.email }, { $push: { lastLogin:obj } }).exec()
                        // data.markModified('lastLogin');
                        // data.save(function(numAffected) {});

                        stoken = {
                            paperflowId: data.paperflowId,
                            email: data.email,
                            active: data.active
                        }

                        var token = jwt.sign(stoken, config.superSecret, { expiresIn: '1d' });

                        Login.update({ "email.email": req.body.email }, { $set: { token: token } }, function(err, loginuser) {
                            if (err) {
                                res.json({ success: false });
                                res.end();
                            } else {

                                res.set({
                                    'token': token
                                });

                                var obj1 = { typeOfOrganization: data.typeOfOrganization, status: data.status }

                                res.json({ success: true, message: "login", data: obj1, token: token })
                                res.end();
                            }
                        })
                    } else {
                        res.json({ success: false, message: "wrong password" });
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
