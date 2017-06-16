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
            console.log("pass", pass)
            RA_login.findOne({ "email.email": req.body.email }, function(err, logindata) {
                    if (logindata == null || logindata == undefined || logindata == '') {

                        RA.findOne({ "email.primary": req.body.email }, function(err, pri) {
                            console.log("pri", pri)
                            if (pri == null || pri == undefined || pri == '') {
                                // Student.findOne({ "email.alternate": req.body.email }, function(err, mail) {
                                //     console.log("alter", mail)
                                //     if (mail == null || mail == undefined || mail == '') {
                                RA.findOne({ $and: [{ firstName: req.body.firstName }, { lastName: req.body.lastName }, { "mother.motherFirstName": req.body.motherFirstName }, { "mother.motherLastName": req.body.motherLastName }, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, name) {
                                        console.log("name", name)
                                        if (name == null || name == undefined || name == '') {
                                            resolve(res.status(406).send({ success: false, message: "Forbidden" }));
                                        } else {

                                            var login = new RA_login;

                                            email = req.body.email
                                            lastModified = currentdate.currentdate();
                                            login.email.push({ email, lastModified })
                                            password = newPassword;
                                            login.password.push({ password, lastModified })
                                            login.paperflowId = name.studentId
                                            login.active = true;
                                            dob = req.body.dateOfBirth;
                                            login.dateOfBirth.push({ dob, lastModified })

                                            login.status = "0";
                                            login.lastModified = currentdate.currentdate();
                                            login.createdAt = currentdate.currentdate();
                                            login.save(function(err,dat) {
                                                if (!err) {

                                                    var tokenObj = {
                                                   
                                                    paperflowId: dat.paperflowId,
                                                    email: req.body.email,
                                                    active: dat.active
                                                         }


                                                var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                                                var obj1 = { status:"0" }
                                                login.token=token
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
                                    //     } else {
                                    //         var login = new RA_login;

                                //         email = req.body.email
                                //         lastModified = currentdate.currentdate();
                                //         login.email.push({ email, lastModified })
                                //         password = newPassword;
                                //         login.password.push({ password, lastModified })
                                //         login.paperflowId = mail.studentId
                                //         login.active = true;
                                //         dob=req.body.dateOfBirth;
                                //         login.dateOfBirth.push({dob,lastModified})

                                //         login.status = "0";
                                //         login.lastModified = currentdate.currentdate();
                                //         login.createdAt = currentdate.currentdate();
                                //         login.save(function(err) {
                                //             if (!err) {
                                //                resolve({sucess:true,message:'User can login'})
                                //                //resolve(email)
                                //             } else {
                                //                 reject({sucess:false,message:err})
                                //                 //reject(err)
                                //             }
                                //         })
                                //     }
                                // })

                            } else {
                                var login = new RA_login;

                                email = req.body.email
                                lastModified = currentdate.currentdate();
                                login.email.push({ email, lastModified })
                                password = newPassword;
                                login.password.push({ password, lastModified })
                                login.paperflowId = pri.studentId
                                login.active = true;
                                dob = req.body.dateOfBirth;
                                login.dateOfBirth.push({ dob, lastModified })

                                login.status = "0";
                                login.lastModified = currentdate.currentdate();
                                login.createdAt = currentdate.currentdate();
                                login.save(function(err,dat) {
                                    if (!err) {
                                        var tokenObj = {
                                                    
                                                    paperflowId: dat.paperflowId,
                                                    email: req.body.email,
                                                    active: dat.active
                                                         }


                                                var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                                                var obj1 = {status:"0"}
                                                login.token=token
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
                }) //studentlogin
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

}
