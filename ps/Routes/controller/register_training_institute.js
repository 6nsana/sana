var express = require('express');
var util=require('../../util.js');
var app = express();
var mongoose = require('mongoose');
var Register = require('../../models/registration');
var ContactRegister = require('../../models/contact');
var Login = require('../../models/login');
//var Login = require('../../models/login');
var Training_int_Register = require('../../models/training_ins');

var router = express.Router();
var multer  = require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })


exports .post=function(req, res) {
                    
                                    Training_int_Register.findOne({ paperflowId:req.decoded.paperflowId}, function(err, d) {
                                        if (d!=null || d != undefined) {
                           
                                               
                                                addressLine1 = req.body.addressLine1;
                                                addressLine2 = req.body.addressLine2;
                                                city = req.body.city;
                                                district = req.body.district;
                                                state = req.body.state;
                                                pinCode = parseInt(req.body.pinCode);
                                                country = req.body.country;
                                                lastmodified=new Date()
                                                d.address.push({addressLine1,addressLine2,city,district,state,pinCode,country,lastmodified})
                                                d.dateOfEstablishment = req.body.dateOfEstablishment;

                                                d.licenseNumber = req.body.licenseNumber;
                                                
                                               

                                                d.panNumber  = req.body.panNumber ;
                                               
                                             

                                                d.serviceTaxNumber = req.body.serviceTaxNumber;
                                                
                                           

                                                website = req.body.website;
                                                lastmodified=new Date()
                                                d.website.push({website,lastmodified})

                                                contactNumber = parseInt(req.body.contactNumber);
                                                d.contact.push({contactNumber,lastmodified})
                                                
                                               
                                                d.save(function(err, da) { 
    
                                            if (err)
                                            {
                                                console.log(err)
                                                res.status(406).send({ status:-2, message: 'Invalid data' })
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
                                        } else{
                                            res.json({ success: true, message: 'not found' });
                                            }
                                            
                                        
                                    });
                                }
                        
            
