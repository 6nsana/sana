var express = require('express');
var student = express();
var mongoose = require('mongoose');
var studentrouter = express.Router();
var Student_Login = require('../../../models/student_login');
var Student = require('../../../models/student');
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


    function studentsearch(primaryEmail) {

        return new Promise(function(resolve, reject) {

            var randomNum = Math.floor((Math.random() * 10000000) + 1000000);
            var newPassword = hashSalt.encode(randomNum);
            pass = newPassword
            console.log("pass",pass)
            Student_Login.findOne({ "email.email": req.body.primaryEmail }, function(err, logindata) {
                if(logindata == null|| logindata == undefined || logindata == ''){

            Student.findOne({ "email.primary": req.body.primaryEmail }, function(err, pri) {
                console.log("pri", pri)
                if (pri == null || pri == undefined || pri == '') {
                    Student.findOne({ "email.alternate": req.body.primaryEmail }, function(err, mail) {
                        console.log("alter", mail)
                        if (mail == null || mail == undefined || mail == '') {
                            Student.findOne({ $and: [{ firstName: req.body.firstName }, { lastName: req.body.lastName }, { "mother.motherFirstName": req.body.motherFirstName }, { "mother.motherLastName": req.body.motherLastName }, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, name) {
                                console.log("name", name)
                                if (name == null || name == undefined || name == '') {
                                    resolve(res.status(406).send({ success: false, message: "Forbidden" }));
                                } else {
                                	
                                    var login = new Student_Login;
                                    
                                    email = req.body.primaryEmail
                                    lastModified = currentdate.currentdate();
                                    login.email.push({ email,lastModified })
                                    password = newPassword;
                                    login.password.push({ password,lastModified })
                                    login.paperflowId = name.studentId
                                    login.active = true;
                                    dob=req.body.dateOfBirth;
                                    login.dateOfBirth.push({dob,lastModified})
           
                                    login.status = "0";
                                    login.lastModified = currentdate.currentdate();
                                    login.createdAt = currentdate.currentdate();
                                    login.save(function(err) {
                                        if (!err) {
                                          resolve({sucess:true,message:'User can login'})
                                               //resolve(email)
                                        } else {
                                            reject({sucess:false,message:err})
                                              //reject(err)
                                        }
                                    })
                                }
                            })
                        } else {
                            var login = new Student_Login;
                            
                            email = req.body.primaryEmail
                            lastModified = currentdate.currentdate();
                            login.email.push({ email, lastModified })
                            password = newPassword;
                            login.password.push({ password, lastModified })
                            login.paperflowId = mail.studentId
                            login.active = true;
                            dob=req.body.dateOfBirth;
                            login.dateOfBirth.push({dob,lastModified})
                           
                            login.status = "0";
                            login.lastModified = currentdate.currentdate();
                            login.createdAt = currentdate.currentdate();
                            login.save(function(err) {
                                if (!err) {
                                   resolve({sucess:true,message:'User can login'})
                                   //resolve(email)
                                } else {
                                    reject({sucess:false,message:err})
                                    //reject(err)
                                }
                            })
                        }
                    })

                } else {
                    var login = new Student_Login;
                    
                    email = req.body.primaryEmail
                    lastModified = currentdate.currentdate();
                    login.email.push({ email, lastModified })
                    password = newPassword;
                    login.password.push({ password, lastModified })
                    login.paperflowId = pri.studentId
                    login.active = true;
                    dob=req.body.dateOfBirth;
                    login.dateOfBirth.push({dob,lastModified})
                    
                    login.status = "0";
                    login.lastModified = currentdate.currentdate();
                    login.createdAt = currentdate.currentdate();
                    login.save(function(err) {
                        if (!err) {
                          resolve({sucess:true,message:'User can login'})
                               //resolve(email)
                        } else {
                         reject({sucess:false,message:err})
                           //reject(err)
                        }
                    })
                }
            })
            }else{
                reject({sucess:false,message:"You cannot register!, already exist"})
            }
            })//studentlogin
        })
    }

    var student_search = studentsearch(req.body.primaryEmail)

    student_search.then(function(msg) {
// console.log(iid)
// console.log(pass)
// console.log(req.body.primaryEmail)

        var message = {
            text: "",
            from: "PaperFlow <testuserdmt@gmail.com>",
            to: req.body.primaryEmail,
            subject: "PaperFlow Account Details",
            attachment: [{
                data: "<html>Hi,<br><h2>You can login with PaperFlow  </h2><br>" + 
                    "These are you login details.<br>" +
                    "Email: <strong> " + req.body.primaryEmail +
                    "</strong>" +
                    "Password: <strong> " + pass +
                    "</strong></html>",
                alternative: true
            }]
        };
        mailSender.send(message, function(err, data) {
        	if(err){
        		console.log(err)
        	}else{
        	console.log('sent')
        }
            //res.json({message:'sent'})
        })

res.json(msg)


    }, function(err) {
        res.json(err)
        res.end()
    })

}
