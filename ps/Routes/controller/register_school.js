var express = require('express');
var util=require('../../util.js');
var app = express();
var mongoose = require('mongoose');
var ContactRegister = require('../../models/contact');
var Register = require('../../models/registration');
var Login = require('../../models/login');

var SchoolRegister = require('../../models/school');
var router = express.Router();


exports.post=function(req, res) {

 SchoolRegister.findOne({ paperflowId:req.decoded.paperflowId}, function(err, school) {
    console.log(school)
                                if (!err) {
                                    
                                    school.nameOfSchool = req.body.nameOfSchool;
                                    school.affiliationBoard = req.body.affiliationBoard;
                                    school.affiliationCode = req.body.affiliationCode;
                                    addressLine1 = req.body.addressLine1;
                                    addressLine2 = req.body.addressLine2;
                                    city = req.body.city;
                                    district = req.body.district;
                                    state = req.body.state;
                                    pinCode = parseInt(req.body.pinCode);
                                    country = req.body.country;
                                    lastmodified=new Date()
                                    school.address.push({addressLine1,addressLine2,city,district,state,pinCode,country,lastmodified})
                                    school.dateOfEstablishment = req.body.dateOfEstablishment;
                                    website = req.body.website;
                                    lastmodified=new Date()
                                    school.website.push({website,lastmodified})

                                    contactNumber = parseInt(req.body.contactNumber);
                                    school.contact.push({contactNumber,lastmodified})
                                    school.branchName = req.body.branch_name;
                                    school.branchAddress = req.body.branchAddress;
                                    
                                    school.schoolStrength = req.body.schoolStrength;
                                    school.typeOfSchool = req.body.typeOfSchool;
                                    school.teachingMedium = req.body.teachingMedium;
                                  
                                    school.save(function(err, da) { 

                                    
                        
                                
                                            if (err)
                                            {
                                                console.log(err)
                                                res.status(406).send({ status:406, message: 'Invalid data' })
                                              }  //res.send(err);

                                            else
                                            {
                                                Login.update({ paperflowId:req.decoded.paperflowId},{$set:{status:'4',lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })
                                                res.json({status:4,success:true, message: 'save and contact person required' })

                                                res.end()
                                            }
                                        });
                                 }else{
                                        res.json({ success: true, message: 'not found' });
                                            }
                            });
                        }
                    

                
