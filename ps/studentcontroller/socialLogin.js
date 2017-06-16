var express = require('express');
var ra = express();
var jwt = require('jsonwebtoken');
var macaddress = require('macaddress');
var mongoose = require('mongoose');
var RA_login = require('../../../models/ra_login');
var config = require('../../../config/config')
var currentdate = require('../../../config/currentdate')
var rarouter = express.Router();

exports.check = function(req, res) {
var socialToken ="qwerty"
    if (socialToken == req.body.socialToken) {
        RA_login.findOne({ "email.email": req.body.email }, function(err, logindata) {
                if (logindata == null || logindata == undefined || logindata == '') {
                    var obj = { status: -1 }
                    res.json({ success: false, message: "Email not found", data: obj })
                } else {


                    var tokenObj = {

                        paperflowId: logindata.paperflowId,
                        email: req.body.email,
                        active: logindata.active
                    		}


                    var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                    var obj1 = {status: "2"}


                        var ip = req.ip.split(":");
                        var clientmac;
                        ipClient = ip[3];
                        
                        macaddress.one(function(err, mac) {
                            clientmac = mac
                        })

                    var obj = { date: currentdate.currentdate(), ip: ipClient, mac: clientmac };
                    logindata.lastLogin.push(obj);

                    logindata.status = "2"
                    logindata.token = token
                    logindata.lastModified = currentdate.currentdate();
                    logindata.save(function(err, dta) {

                        if (!err) {
                            res.json({ sucess: true, message: 'User can login', data: obj1, token: token })
                        } else {
                            res.json({ success: false, message: "Error" })
                        }
                    })
                }
            
        })
} else {
    res.json({ success: false, message: "Social Token not match" })
}
}
