var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Register = require('../../models/registration');
var Training_com_Register = require('../../models/training_company');
var Training_int_Register = require('../../models/training_ins');
var SchoolRegister = require('../../models/school');
var ContactRegister = require('../../models/contact');
var Login = require('../../models/login');
var email = require('emailjs');
var config =require('../../config/config')
var fs = require('file-system');
var jwt = require('jsonwebtoken');
var router = express.Router();


var mailSender = email.server.connect({
    user: "testuserdmt@gmail.com",
    password: "Testuserdmt_1234",
    host: "smtp.gmail.com",
    ssl: true
});



exports.post = function(req, res) {
Register.findOne({ "email.email": req.body.email }, function(err, data) {
    console.log(data.email[0].lastmodified)
        if (!err) {
            verCode = data.verifyCode;
            if (verCode == req.body.verifyCode) {

                Login.findOne({ "email.email": data.email[0].email }, function(err, logindata) {
                    console.log(logindata)
                    if (logindata == null || logindata == undefined) {
                        
 


                        if (data.typeOfOrganization == 001) { 
                        //Training_company


                            Training_com_Register.findOne({ paperflowId: { $regex: 'TC' + '/' + data.country + '/' + data.state.toUpperCase() } }, { paperflowId: 1, _id: 0 }).sort({ paperflowId: -1 }).limit(1).exec(function(err, dataa) {

                                if (dataa == null || dataa == 'undefined') {

                                    var contactregister = new ContactRegister();
                                    contactregister.nameOfOrganization =data.nameOfOrganization
                                    contactregister.typeOfOrganization = data.typeOfOrganization
                                    contactregister.organizationPaperflowId = 'TC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    contactregister.paperflowId = 'TC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP' +'/'+'001'
                                    contactregister.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push" })

                                        } else {
                                            //console.log(dat)
                                        }
                                    })


                                    var training_com = new Training_com_Register();
                                    training_com.nameOfOrganization =data.nameOfOrganization
                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    training_com.email.push({email,lastmodified})
                                    training_com.typeOfOrganization = data.typeOfOrganization;
                                    training_com.paperflowId = 'TC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    training_com.verified = "Yes";
                                    paperflowId='TC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP' +'/'+'001'
                                    training_com.contactperson.push({paperflowId})
                                    training_com.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push2" })

                                        } else {
                                            //console.log(data)
                                        }
                                    })
                                    var newlogin = new Login();

                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    newlogin.email.push({email,lastmodified})
                                    password = req.body.password;

                                    lastmodified=data.password[0].lastmodified
                                    newlogin.password.push({password,lastmodified})
                                    newlogin.typeOfOrganization = data.typeOfOrganization;
                                    newlogin.nameOfOrganization = data.nameOfOrganization;
                                    newlogin.active = true;
                                    newlogin.status='3';
                                    newlogin.createdAt=new Date()
                                    newlogin.paperflowId = 'TC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    newlogin.save(function(err, dat) {
                                        if (err) {
                                            res.json({ success: false, message: "not push3" })

                                        } else {

                                            var tokenObj = {
                                                    paperflowId: dat.paperflowId,
                                                    email: dat.email,
                                                    active: dat.active
                                                            }
                                                            

                            var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                                var obj1={typeOfOrganization:data.typeOfOrganization,status:'3'}

                                var id='TC' + '_' + data.country + '_' + data.state.toUpperCase() + '_' + '0001'

                                        fs.mkdir("uploads/"+id, function(err) {
                                        
                                        console.log('folder make')
                                    })

                            res.json({success: true, message:"organization required", data:obj1,token:token })
                            //res.json({success:true, data:dat,token:token })
                                           newlogin.token=token
                                           newlogin.save()

                                           
                                   




                                        }
                                    })
                                } else {

                                    console.log(dataa.paperflowId)


                                    v = dataa.paperflowId
                                    console.log(v)

                                    var values = v.split('/');


                                    var street = values[3];
                                    console.log(street)

                                    yourNumber = parseInt(street, 16);
                                    console.log(yourNumber)

                                    var i = yourNumber + 1;
                                    n = i.toString(16)
                                    x = n.length;
                                    console.log(x)
                                    digit = 4 - x;
                                    if (digit == 3)
                                        id = '000' + n
                                    if (digit == 2)
                                        id = '00' + n
                                    if (digit == 1)
                                        id = '0' + n
                                    if (digit == 0)
                                        id = n
                                    console.log(id)

                                    var contactregister = new ContactRegister();
                                    contactregister.nameOfOrganization =data.nameOfOrganization
                                    contactregister.typeOfOrganization = data.typeOfOrganization
                                    contactregister.organizationPaperflowId = 'TC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    contactregister.paperflowId = 'TC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id + '/' + 'CP'+'/'+'001'
                                    contactregister.save(function(err, dat) {
                                        if (err) {
                                             console.log({ success: false, message: "not push" })
                                        } else {
                                            //console.log(dat)
                                        }
                                    })

                                    var training_com = new Training_com_Register();
                                   email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    training_com.email.push({email,lastmodified})
                                    training_com.nameOfOrganization =data.nameOfOrganization
                                    training_com.typeOfOrganization = data.typeOfOrganization;
                                    training_com.paperflowId = 'TC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    training_com.verified = "Yes";
                                    paperflowId='TC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP' +'/'+'001'
                                    training_com.contactperson.push({paperflowId})
                                    training_com.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push2" })
                                        } else {
                                            //console.log(dat)
                                        }
                                    })
                                    var newlogin = new Login();

                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    newlogin.email.push({email,lastmodified})
                                    password = req.body.password;

                                    lastmodified=data.password[0].lastmodified
                                    newlogin.password.push({password,lastmodified})
                                    newlogin.typeOfOrganization = data.typeOfOrganization;
                                    newlogin.nameOfOrganization = data.nameOfOrganization;
                                    newlogin.active = true;
                                    newlogin.status='3';
                                     newlogin.createdAt=new Date()
                                    newlogin.paperflowId = 'TC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    newlogin.save(function(err, dat) {
                                      //console.log(dat.paperflowId)  
                                        if (err) {
                                             res.json({ success: false, message: "not push3" })
                                        } else {
                                            var tokenObj = {
                                                    paperflowId: dat.paperflowId,
                                                    email: dat.email,
                                                    active: dat.active
                                                            }

                            var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                                    var obj1={typeOfOrganization:data.typeOfOrganization,status:'3'}

                            var id1='TC' + '_' + data.country + '_' + data.state.toUpperCase() + '_' + id

                            fs.mkdir("uploads/"+id1, function(err) {
                                        
                                        console.log('folder make')
                                    })
                            res.json({success: true, message:"organization required", data:obj1,token:token })
                            //res.json({success:true, data:dat,token:token })
                            newlogin.token=token
                                           newlogin.save()

                                          
                                          
                                        }
                                        
                                    })

                                }
                            })



                            console.log(req.body.email)
                            console.log(req.body.password)

                            var message = {
                                text: "",
                                from: "PaperFlow <testuserdmt@gmail.com>",
                                to: req.body.email,
                                subject: "PaperFlow Account Verification",
                                attachment: [{
                                    data: "<html>Hi,<br><h2>Thank you for registering with PaperFlow.</h2><br>" +
                                        " Your registration process is completed .<br>" +
                                        "Password: <strong> " + req.body.password + "<strong><br>" +
                                        "Email: <strong> " + req.body.email +
                                        "</strong></html>",
                                    alternative: true
                                }]
                            };
                            mailSender.send(message, function(err, data) {
                                console.log('mail sent')
                                //res.json({ success: true, message:'successfully save'});
                                res.end();
                            })
                        } 
                        else if (data.typeOfOrganization == 002) { //Training_institute
                            Training_int_Register.findOne({ paperflowId: { $regex: 'TI' + '/' + data.country + '/' + data.state.toUpperCase() } }, { paperflowId: 1, _id: 0 }).sort({ paperflowId: -1 }).limit(1).exec(function(err, dataa) {

                                if (dataa == null || dataa == 'undefined') {

                                    var contactregister = new ContactRegister();
                                    contactregister.nameOfOrganization =data.nameOfOrganization
                                    contactregister.typeOfOrganization = data.typeOfOrganization
                                    contactregister.organizationPaperflowId = 'TI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    contactregister.paperflowId = 'TI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP'+'/'+'001'
                                    contactregister.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push" })

                                        } else {
                                            //console.log(dat)
                                        }
                                    })


                                    var training_ins = new Training_int_Register();
                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    training_ins.email.push({email,lastmodified})
                                    training_ins.nameOfOrganization =data.nameOfOrganization
                                    training_ins.typeOfOrganization = data.typeOfOrganization;
                                    training_ins.paperflowId = 'TI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    training_ins.verified = "Yes";
                                    paperflowId='TI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP'+'/'+'001'
                                    training_ins.contactperson.push({paperflowId})
                                    training_ins.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push2" })

                                        } else {
                                            //console.log(data)
                                        }
                                    })
                                    var newlogin = new Login();

                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    newlogin.email.push({email,lastmodified})
                                    password = req.body.password;

                                    lastmodified=data.password[0].lastmodified
                                    newlogin.password.push({password,lastmodified})
                                    newlogin.typeOfOrganization = data.typeOfOrganization;
                                    newlogin.nameOfOrganization = data.nameOfOrganization;
                                    newlogin.active = true;
                                    newlogin.status='3';
                                     newlogin.createdAt=new Date()
                                    newlogin.paperflowId = 'TI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    newlogin.save(function(err, dat) {
                                        if (err) {
                                           res.json({ success: false, message: "not push3" })

                                        } else {
                                             var tokenObj = {
                                                    paperflowId: dat.paperflowId,
                                                    email: dat.email,
                                                    active: dat.active
                                                            }

                            var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });

                            var obj1={typeOfOrganization:data.typeOfOrganization,status:'3'}

var id1='TI' + '_' + data.country + '_' + data.state.toUpperCase() + '_' + '0001'

                            fs.mkdir("uploads/"+id1, function(err) {
                                        
                                        console.log('folder make')
                                    })



                            res.json({success: true, message:"organization required", data:obj1,token:token })
                            //res.json({success:true, data:dat,token:token })
                            newlogin.token=token
                                           newlogin.save()

                                        }
                                    })
                                } else {

                                    console.log(dataa.paperflowId)


                                    v = dataa.paperflowId
                                    console.log(v)

                                    var values = v.split('/');


                                    var street = values[3];
                                    console.log(street)

                                    yourNumber = parseInt(street, 16);
                                    console.log(yourNumber)

                                    var i = yourNumber + 1;
                                    n = i.toString(16)
                                    x = n.length;
                                    console.log(x)
                                    digit = 4 - x;
                                    if (digit == 3)
                                        id = '000' + n
                                    if (digit == 2)
                                        id = '00' + n
                                    if (digit == 1)
                                        id = '0' + n
                                    if (digit == 0)
                                        id = n
                                    console.log(id)

                                    var contactregister = new ContactRegister();
                                    contactregister.nameOfOrganization =data.nameOfOrganization
                                    contactregister.typeOfOrganization = data.typeOfOrganization
                                    contactregister.organizationPaperflowId = 'TI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    contactregister.paperflowId = 'TI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id + '/' + 'CP'+'/'+'001'
                                    contactregister.save(function(err, dat) {
                                        if (err) {
                                             console.log({ success: false, message: "not push" })
                                        } else {
                                            console.log(dat)
                                        }
                                    })

                                    var training_ins = new Training_int_Register();
                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    training_ins.email.push({email,lastmodified})
                                     training_ins.nameOfOrganization =data.nameOfOrganization
                                    training_ins.typeOfOrganization = data.typeOfOrganization;
                                    training_ins.paperflowId = 'TI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    training_ins.verified = "Yes";
                                    paperflowId='TI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP'+'/'+'001'
                                    training_ins.contactperson.push({paperflowId})
                                    training_ins.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push2" })
                                        } else {
                                            console.log(dat)
                                        }
                                    })
                                    var newlogin = new Login();

                                   email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    newlogin.email.push({email,lastmodified})
                                    password = req.body.password;

                                    lastmodified=data.password[0].lastmodified
                                    newlogin.password.push({password,lastmodified})
                                    newlogin.typeOfOrganization = data.typeOfOrganization;
                                      newlogin.nameOfOrganization = data.nameOfOrganization;
                                    newlogin.active = true;
                                    newlogin.status='3';
                                     newlogin.createdAt=new Date()
                                    newlogin.paperflowId = 'TI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    newlogin.save(function(err, dat) {
                                        if (err) {
                                            res.json({ success: false, message: "not push3" })

                                        } else {
                                             var tokenObj = {
                                                    paperflowId: dat.paperflowId,
                                                    email: dat.email,
                                                    active: dat.active
                                                            }

                            var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                            var obj1={typeOfOrganization:data.typeOfOrganization,status:'3'}

                            var id1='TI' + '_' + data.country + '_' + data.state.toUpperCase() + '_' + id

                            fs.mkdir("uploads/"+id1, function(err) {
                                        
                                        console.log('folder make')
                                    })
                            res.json({success: true, message:"organization required", data:obj1,token:token })
                            //res.json({success:true, data:dat,token:token })
                            newlogin.token=token
                                           newlogin.save()

                                        }
                                    })

                                }
                            })



                            console.log(data.email)
                            console.log(data.password)

                            var message = {
                                text: "",
                                from: "PaperFlow <testuserdmt@gmail.com>",
                                to: req.body.email,
                                subject: "PaperFlow Account Verification",
                                attachment: [{
                                    data: "<html>Hi,<br><h2>Thank you for registering with PaperFlow.</h2><br>" +
                                        " Your registration process is completed .<br>" +
                                        "Password: <strong> " + req.body.password + "<strong><br>" +
                                        "Email: <strong> " + req.body.email +
                                        "</strong></html>",
                                    alternative: true
                                }]
                            };
                            mailSender.send(message, function(err, data) {
                                console.log('sent mail')
                                //res.json({ success: true, message:'successfully save'});
                                res.end();
                            })
                        } else if (data.typeOfOrganization == 003) { //ITI

                            Training_com_Register.findOne({ paperflowId: { $regex: 'ITI' + '/' + data.country + '/' + data.state.toUpperCase() } }, { paperflowId: 1, _id: 0 }).sort({ paperflowId: -1 }).limit(1).exec(function(err, dataa) {

                                if (dataa == null || dataa == 'undefined') {

                                    var contactregister = new ContactRegister();
                                     contactregister.nameOfOrganization =data.nameOfOrganization
                                    contactregister.typeOfOrganization = data.typeOfOrganization
                                    contactregister.organizationPaperflowId = 'ITI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    contactregister.paperflowId = 'ITI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP'+'/'+'001'
                                    contactregister.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push" })

                                        } else {
                                            console.log(dat)
                                        }
                                    })


                                    var training_com = new Training_com_Register();
                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    training_com.email.push({email,lastmodified})
                                     training_com.nameOfOrganization =data.nameOfOrganization
                                    training_com.typeOfOrganization = data.typeOfOrganization;
                                    training_com.paperflowId = 'ITI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    training_com.verified = "Yes";
                                    paperflowId='ITI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP'+'/'+'001'
                                    training_com.contactperson.push({paperflowId})
                                    training_com.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push2" })

                                        } else {
                                            console.log(dat)
                                        }
                                    })
                                    var newlogin = new Login();

                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    newlogin.email.push({email,lastmodified})
                                    password = req.body.password;

                                    lastmodified=data.password[0].lastmodified
                                    newlogin.password.push({password,lastmodified})
                                    newlogin.typeOfOrganization = data.typeOfOrganization;
                                      newlogin.nameOfOrganization = data.nameOfOrganization;
                                    newlogin.active = true;
                                    newlogin.status='3';
                                     newlogin.createdAt=new Date()
                                    newlogin.paperflowId = 'ITI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    newlogin.save(function(err, dat) {
                                        if (err) {
                                            res.json({ success: false, message: "not push3" })


                                        } else {
                                             var tokenObj = {
                                                    paperflowId: dat.paperflowId,
                                                    email: dat.email,
                                                    active: dat.active
                                                            }

                            var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                            var obj1={typeOfOrganization:data.typeOfOrganization,status:'3'}
                            var id1='ITI' + '_' + data.country + '_' + data.state.toUpperCase() + '_' + '0001'

                            fs.mkdir("uploads/"+id1, function(err) {
                                        
                                        console.log('folder make')
                                    })
                            res.json({success: true, message:"organization required", data:obj1,token:token })
                            //res.json({success:true, data:dat,token:token })
                            newlogin.token=token
                                           newlogin.save()

                                            
                                        }
                                    })
                                } else {

                                    console.log(dataa.paperflowId)


                                    v = dataa.paperflowId
                                    console.log(v)

                                    var values = v.split('/');


                                    var street = values[3];
                                    console.log(street)

                                    yourNumber = parseInt(street, 16);
                                    console.log(yourNumber)

                                    var i = yourNumber + 1;
                                    n = i.toString(16)
                                    x = n.length;
                                    console.log(x)
                                    digit = 4 - x;
                                    if (digit == 3)
                                        id = '000' + n
                                    if (digit == 2)
                                        id = '00' + n
                                    if (digit == 1)
                                        id = '0' + n
                                    if (digit == 0)
                                        id = n
                                    console.log(id)

                                    var contactregister = new ContactRegister();
                                     contactregister.nameOfOrganization =data.nameOfOrganization
                                    contactregister.typeOfOrganization = data.typeOfOrganization
                                    contactregister.OrganizationPaperflowId = 'ITI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    contactregister.paperflowId = 'ITI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id + '/' + 'CP'+'/'+'001'
                                    contactregister.save(function(err, dat) {
                                        if (err) {
                                             console.log({ success: false, message: "not push" })
                                        } else {
                                            console.log(dat)
                                        }
                                    })

                                    var training_com = new Training_com_Register();
                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    training_com.email.push({email,lastmodified})
                                    training_com.nameOfOrganization =data.nameOfOrganization
                                    training_com.typeOfOrganization = data.typeOfOrganization;
                                    training_com.paperflowId = 'ITI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    training_com.verified = "Yes";
                                    paperflowId='ITI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP'+'/'+'001'
                                    training_com.contactperson.push({paperflowId})
                                    training_com.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push2" })
                                        } else {
                                            console.log(dat)
                                        }
                                    })
                                    var newlogin = new Login();

                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    newlogin.email.push({email,lastmodified})
                                    password = req.body.password;

                                    lastmodified=data.password[0].lastmodified
                                    newlogin.password.push({password,lastmodified})
                                    newlogin.typeOfOrganization = data.typeOfOrganization;
                                      newlogin.nameOfOrganization = data.nameOfOrganization;
                                    newlogin.active = true;
                                    newlogin.status='3';
                                     newlogin.createdAt=new Date()
                                    newlogin.paperflowId = 'ITI' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    newlogin.save(function(err, dat) {
                                        if (err) {
                                            res.json({ success: false, message: "not push3" })


                                        } else {
                                             var tokenObj = {
                                                    paperflowId: dat.paperflowId,
                                                    email: dat.email,
                                                    active: dat.active
                                                            }

                            var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                            var obj1={typeOfOrganization:data.typeOfOrganization,status:'3'}

                            var id1='ITI' + '_' + data.country + '_' + data.state.toUpperCase() + '_' + id

                            fs.mkdir("uploads/"+id1, function(err) {
                                        
                                        console.log('folder make')
                                    })
                            res.json({success: true, message:"organization required", data:obj1,token:token })
                           // res.json({success:true, data:dat,token:token })
                            newlogin.token=token
                                           newlogin.save()

                                            
                                        }
                                    })

                                }
                            })



                            console.log(req.body.email)
                            console.log(req.body.password)

                            var message = {
                                text: "",
                                from: "PaperFlow <testuserdmt@gmail.com>",
                                to: req.body.email,
                                subject: "PaperFlow Account Verification",
                                attachment: [{
                                    data: "<html>Hi,<br><h2>Thank you for registering with PaperFlow.</h2><br>" +
                                        " Your registration process is completed .<br>" +
                                        "Password: <strong> " +req.body.password + "<strong><br>" +
                                        "Email: <strong> " + req.body.email +
                                        "</strong></html>",
                                    alternative: true
                                }]
                            };
                            mailSender.send(message, function(err, data) {
                                 console.log('sent mail')
                                //res.json({ success: true, message:'successfully save'});
                                res.end();
                            })
                        } else if (data.typeOfOrganization == 004) { //school
                            SchoolRegister.findOne({ paperflowId: { $regex: 'SC' + '/' + data.country + '/' + data.state.toUpperCase() } }, { paperflowId: 1, _id: 0 }).sort({ paperflowId: -1 }).limit(1).exec(function(err, dataa) {

                                if (dataa == null || dataa == 'undefined') {

                                    var contactregister = new ContactRegister();
                                     contactregister.nameOfOrganization =data.nameOfOrganization
                                    contactregister.typeOfOrganization = data.typeOfOrganization
                                    contactregister.organizationPaperflowId = 'SC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    contactregister.paperflowId = 'SC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP'+'/'+'001'
                                    contactregister.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push" })

                                        } else {
                                            console.log(dat)
                                        }
                                    })


                                    var school = new SchoolRegister();
                                   email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    school.email.push({email,lastmodified})
                                    school.nameOfOrganization =data.nameOfOrganization
                                    school.typeOfOrganization = data.typeOfOrganization;
                                    school.paperflowId = 'SC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    school.verified = "Yes";
                                    paperflowId='SC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP'+'/'+'001'
                                    school.contactperson.push({paperflowId})
                                    school.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push2" })

                                        } else {
                                            console.log(data)
                                        }
                                    })
                                    var newlogin = new Login();

                                  email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    newlogin.email.push({email,lastmodified})
                                    password = req.body.password;

                                    lastmodified=data.password[0].lastmodified
                                    newlogin.password.push({password,lastmodified})
                                    newlogin.typeOfOrganization = data.typeOfOrganization;
                                      newlogin.nameOfOrganization = data.nameOfOrganization;
                                    newlogin.active = true;
                                    newlogin.status='3';
                                     newlogin.createdAt=new Date()
                                    newlogin.paperflowId = 'SC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001'
                                    newlogin.save(function(err, dat) {
                                        if (err) {
                                          res.json({ success: false, message: "not push3" })


                                        } else {
                                             var tokenObj = {
                                                    paperflowId: dat.paperflowId,
                                                    email: dat.email,
                                                    active: dat.active
                                                            }

                            var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                            var obj1={typeOfOrganization:data.typeOfOrganization,status:'3'}
                            var id1='SC' + '_' + data.country + '_' + data.state.toUpperCase() + '_' + '0001'

                            fs.mkdir("uploads/"+id1, function(err) {
                                        
                                        console.log('folder make')
                                    })
                            res.json({success: true, message:"organization required", data:obj1,token:token })
                            //res.json({success:true, data:dat,token:token })
                            newlogin.token=token
                                           newlogin.save()

                                        
                                        }
                                    })
                                } else {

                                    console.log(dataa.paperflowId)


                                    v = dataa.paperflowId
                                    console.log(v)

                                    var values = v.split('/');


                                    var street = values[3];
                                    console.log(street)

                                    yourNumber = parseInt(street, 16);
                                    console.log(yourNumber)

                                    var i = yourNumber + 1;
                                    n = i.toString(16)
                                    x = n.length;
                                    console.log(x)
                                    digit = 4 - x;
                                    if (digit == 3)
                                        id = '000' + n
                                    if (digit == 2)
                                        id = '00' + n
                                    if (digit == 1)
                                        id = '0' + n
                                    if (digit == 0)
                                        id = n
                                    console.log(id)

                                    var contactregister = new ContactRegister();
                                     contactregister.nameOfOrganization =data.nameOfOrganization
                                    contactregister.typeOfOrganization = data.typeOfOrganization
                                    contactregister.organizationPaperflowId = 'SC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    contactregister.paperflowId = 'SC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id + '/' + 'CP'+'/'+'001'
                                    contactregister.save(function(err, dat) {
                                        if (err) {
                                             console.log({ success: false, message: "not push" })
                                        } else {
                                            console.log(dat)
                                        }
                                    })

                                    var school = new SchoolRegister();
                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    school.email.push({email,lastmodified})
                                    school.nameOfOrganization =data.nameOfOrganization
                                    school.typeOfOrganization = data.typeOfOrganization;
                                    school.paperflowId = 'SC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    school.verified = "Yes";
                                    paperflowId='SC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + '0001' + '/' + 'CP'+'/'+'001'
                                    school.contactperson.push({paperflowId})
                                    school.save(function(err, dat) {
                                        if (err) {
                                            console.log({ success: false, message: "not push2" })
                                        } else {
                                            console.log(dat)
                                        }
                                    })
                                    var newlogin = new Login();

                                    email = req.body.email;
                                    lastmodified=data.email[0].lastmodified
                                    newlogin.email.push({email,lastmodified})
                                    password = req.body.password;

                                    lastmodified=data.password[0].lastmodified
                                    newlogin.password.push({password,lastmodified})
                                    newlogin.typeOfOrganization = data.typeOfOrganization;
                                      newlogin.nameOfOrganization = data.nameOfOrganization;
                                    newlogin.active = true;
                                    newlogin.status='3';
                                     newlogin.createdAt=new Date()
                                    newlogin.paperflowId = 'SC' + '/' + data.country + '/' + data.state.toUpperCase() + '/' + id
                                    newlogin.save(function(err, dat) {
                                        if (err) {
                                            res.json({ success: false, message: "not push3" })


                                        } else {


                                            var tokenObj = {
                                                    paperflowId: dat.paperflowId,
                                                    email: dat.email,
                                                    active: dat.active
                                                            }

                            var token = jwt.sign(tokenObj, config.superSecret, { expiresIn: '1d' });
                            var obj1={typeOfOrganization:data.typeOfOrganization,status:'3'}
                            var id1='SC' + '_' + data.country + '_' + data.state.toUpperCase() + '_' + id

                            fs.mkdir("uploads/"+id1, function(err) {
                                        
                                        console.log('folder make')
                                    })
                            res.json({success: true, message:"organization required", data:obj1,token:token })
                            //res.json({success:true, data:dat,token:token })
                            newlogin.token=token
                                           newlogin.save()
                                            
                                        }
                                    })

                                }
                            })



                            console.log(req.body.email)
                            console.log(req.body.password)

                            var message = {
                                text: "",
                                from: "PaperFlow <testuserdmt@gmail.com>",
                                to: req.body.email,
                                subject: "PaperFlow Account Verification",
                                attachment: [{
                                    data: "<html>Hi,<br><h2>Thank you for registering with PaperFlow.</h2><br>" +
                                        " Your registration process is completed .<br>" +
                                        "Password: <strong> " + req.body.password + "<strong><br>" +
                                        "Email: <strong> " + req.body.email +
                                        "</strong></html>",
                                    alternative: true
                                }]
                            };
                            mailSender.send(message, function(err, data) {
                                console.log('mail sent')
                                //res.json({ success: true, message:'successfully save'});
                                res.end();
                            })



                        } else {
                            console.log(err)
                            console.log("nothing to save")
                            res.json({ success: false });
                            res.end();
                        }
                    }else {
                        console.log(err)
                        console.log("login is not empty")
                        res.json({ success: false });
                        res.end();
                    }
                });
            }
        } else {
                console.log(err)
                console.log("error")
                res.json({ success: false,message:'wrong verify code'  });
                res.end();
            }
        }) // email is not found
}

