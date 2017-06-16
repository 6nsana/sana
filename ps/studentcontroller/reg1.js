var express = require('express');
var ra = express();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var rarouter = express.Router();
var RA_login = require('../../../models/ra_login');
var RA = require('../../../models/ra');
var config = require('../../../config/config')
var currentdate = require('../../../config/currentdate')
var email = require('emailjs');
var http = require('http');
var urlencode = require('urlencode');
var Hashids = require('hashids')
var hashSalt = new Hashids('PaperFlow forget password');

var mailSender = email.server.connect({
    user: "testuserdmt@gmail.com",
    password: "Testuserdmt_1234",
    host: "smtp.gmail.com",
    ssl: true
});

exports.post = function(req, res) {
    var pass;


    function rasearch(email) {

        return new Promise(function(resolve, reject) {

            var randomNum = Math.floor((Math.random() * 10000000) + 1000000);
            var newPassword = hashSalt.encode(randomNum);
            pass = newPassword
            console.log("password", pass)
            RA_login.findOne({ "email.email": req.body.email }, function(err, logindata) {
                if (logindata == null || logindata == undefined || logindata == '') {

                    RA.findOne({
                        $and: [{ "email.primary": req.body.email },
                            { "firstName": req.body.firstName },
                            { "middleName": req.body.middleName },
                            { "lastName": req.body.lastName },
                            { "father.fatherFirstName": req.body.fatherFirstName },
                            { "father.fatherMiddleName": req.body.fatherMiddleName },
                            { "father.fatherLastName": req.body.fatherLastName },
                            { "father.fatherEmail": req.body.fatherEmail },
                            { "mother.motherFirstName": req.body.motherFirstName },
                            { "mother.motherMiddleName": req.body.motherMiddleName },
                            { "mother.motherLastName": req.body.motherLastName },
                            { "mother.motherEmail": req.body.motherEmail },
                            { "dateOfBirth.dob": req.body.dateOfBirth }
                        ]
                    }, function(err, radata) {
                        console.log("ra",radata)
                        //console.log(radata.studentId)
                         if(radata == null || radata == undefined || radata == '') {


                            var createraidDetail = createraid(req.body.email)
                            createraidDetail.then(function(id) {
                                        console.log("id",id)
                                var ra = new RA;
                                console.log("[[[[[[")
                                lastModified = currentdate.currentdate();
                                primary = req.body.email
                                ra.email.push({ primary })
                                ra.firstName = req.body.firstName
                                ra.middleName = req.body.middleName
                                ra.lastName = req.body.lastName
                                fatherFirstName = req.body.fatherFirstName
                                fatherMiddleName = req.body.fatherMiddleName
                                fatherLastName = req.body.fatherLastName
                                fatherEmail = req.body.fatherEmail
                                ra.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail, lastModified })
                                motherFirstName = req.body.motherFirstName
                                motherMiddleName = req.body.motherMiddleName
                                motherLastName = req.body.motherLastName
                                motherEmail = req.body.motherEmail
                                ra.mother.push({ motherFirstName, motherMiddleName, motherLastName, motherEmail, lastModified })
                                dob = req.body.dateOfBirth
                                ra.dateOfBirth.push({ dob, lastModified })
                                ra.studentId = id

                                    console.log(",,,,")

                                var login = new RA_login;

                                email = req.body.email
                                lastModified = currentdate.currentdate();
                                login.email.push({ email, lastModified })
                                login.paperflowId = id
                                password = newPassword;
                                login.password.push({ password, lastModified })
                                login.paperflowId = name.studentId
                                login.active = true;
                                dob = req.body.dateOfBirth;
                                login.dateOfBirth.push({ dob, lastModified })

                                login.status = "1";
                                login.lastModified = currentdate.currentdate();
                                login.createdAt = currentdate.currentdate();
                                console.log(";;;;;;;;;;;")
                                ra.save(function(err, ra) {
                                    if (!err) {
                                        login.save(function(err, dat) {
                                            if (!err) {

                                                var tokenObj = {

                                                    paperflowId: dat.paperflowId,
                                                    email: req.body.email,
                                                    active: dat.active
                                                }


                                                var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                                                var obj1 = { status: "1" }
                                                login.token = token
                                                login.save()

                                                console.log("save")
                                                resolve({ sucess: true, message: 'User can login', data: obj1, token: token })
                                                    //resolve(email)
                                            } else {
                                                console.log(err)
                                                reject({ sucess: false, message: 'Error in login', data: err })
                                                    //reject(err)
                                            }

                                        })
                                    } else {

                                        reject({ sucess: false, message: 'Error in ra', data: err })
                                            //reject(err)
                                    }
                                })

                            }, function(err) {
                                reject({ sucess: false, message: 'Error in id', data: err })
                            })

                        }else  {
                            console.log("-------------")


                            var login = new RA_login;

                            email = req.body.email
                            lastModified = currentdate.currentdate();
                            login.email.push({ email, lastModified })
                            password = newPassword;
                            login.password.push({ password, lastModified })
                            login.paperflowId = radata.studentId;
                            login.active = true;
                            dob = req.body.dateOfBirth;
                            login.dateOfBirth.push({ dob, lastModified })

                            login.status = "0";
                            login.lastModified = currentdate.currentdate();
                            login.createdAt = currentdate.currentdate();
                            login.save(function(err, dat) {
                                if (!err) {

                                    var tokenObj = {

                                        paperflowId: dat.paperflowId,
                                        email: req.body.email,
                                        active: dat.active
                                    }


                                    var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                                    var obj1 = { status: "0" }
                                    login.token = token
                                    login.save()


                                    resolve({ sucess: true, message: 'User can login', data: obj1, token: token })
                                        //resolve(email)
                                } else {

                                    reject({ sucess: false, message: err })
                                        //reject(err)
                                }
                            })
                        }

                    })
                } else {
                    reject({ sucess: false, message: "You cannot register!, already exist" })
                }
            })
        })
    }

    var ra_search = rasearch(req.body.email)

    ra_search.then(function(msg) {


        var message = {
            text: "",
            from: "PaperFlow <testuserdmt@gmail.com>",
            to: req.body.email,
            subject: "PaperFlow Account Details",
            attachment: [{
                data: "<html>Hi,<br><h2>You can login with PaperFlow  </h2><br>" +
                    "These are you login details.<br>" +
                    "Email: <strong> " + req.body.email +
                    "</strong>" +
                    "Password: <strong> " + pass +
                    "</strong></html>",
                alternative: true
            }]
        };
        mailSender.send(message, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('sent')
            }

        })

        res.json(msg)


    }, function(err) {
        res.json(err)
        res.end()
    })




    function createraid(email) {
        return new Promise(function(resolve, reject) {
            console.log("]]]]]]")
            var raid = 0;
            RA.count().exec().then(function(getcount) {
                if (getcount == 0) {
                    raid = 1
                    console.log(raid)
                    resolve(raid)
                } else {
                    RA.find().exec().then(function(studata) {
                        var stumapdata = studata.map(function(mapdata) {
                            return parseInt(mapdata.studentId)
                        })
                        var maxraid = Math.max.apply(null, stumapdata)
                        console.log(stumapdata)
                        console.log(maxraid)
                        raid = maxraid + 1;
                        console.log(raid)
                        resolve(raid)

                        console.log("nextid: " + raid)
                    }).catch(function(err) {
                        console.log(err)
                        reject({ success: false, message: err })
                    })
                }

            }).catch(function(err) {
                console.log(err)
                reject({ success: false, message: err })
            })
        })

    }

}
