var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Register = require('../../models/registration');
var util = require('../../util.js');
var ContactRegister = require('../../models/contact');
var Login = require('../../models/login');
var email = require('emailjs');
var http = require('http');
var urlencode = require('urlencode');
var router = express.Router();


var mailSender = email.server.connect({
    user: "testuserdmt@gmail.com",
    password: "Testuserdmt_1234",
    host: "smtp.gmail.com",
    ssl: true
});


exports.post = function(req, res) {

            console.log(req.decoded.paperflowId)
            //pid=req.decoded.paperflowId
           ContactRegister.findOne({"organizationPaperflowId" :req.decoded.paperflowId},function(err, contactregister) {
        //ContactRegister.findOne({organizationPaperflowId:req.decoded.paperflowId }, function(err, contactregister) {
            //console.log(contactregister)
            if (!err) {
                if (contactregister != null || contactregister != undefined) {

                    //contactregister.paprflowId  = decoded.paprflowId +'/'+'CP001' ;
                    lastmodified=new Date()
                    contactregister.firstName = req.body.firstName;
                    contactregister.middleName = req.body.middleName;
                    contactregister.lastName = req.body.lastName;
                    dob = req.body.dateOfBirth;
                    contactregister.dateOfBirth.push({dob})
                    contactregister.gender = req.body.gender;
                    contactregister.nationality = req.body.nationality;
                    fatherFirstName = req.body.fatherFirstName;
                    fatherMiddleName=req.body.fatherMiddleName;
                    fatherLastName=req.body.fatherLastName;

                    fatherEmail = req.body.fatherEmail;
                    contactregister.father.push({ fatherFirstName,fatherMiddleName,fatherLastName, fatherEmail })
                    motherFirstName = req.body.motherFirstName;
                    motherMiddleName = req.body.motherMiddleName;
                    motherLastName = req.body.motherLastName;
                    motherEmail = req.body.motherEmail;

                    contactregister.mother.push({ motherFirstName,motherMiddleName,motherLastName,motherEmail })
                    contactregister.maritalStatus = req.body.maritalStatus;
                    hsStatus = req.body.hsStatus;
                    hsFirstName=req.body.hsFirstName;
                    hsMiddleName=req.body.hsMiddleName;
                    hsLastName=req.body.hsLastName;
                    
                    hsEmail = req.body.hsEmail;
                    contactregister.typeHs.push({ hsStatus,hsFirstName,hsLastName,hsMiddleName,hsEmail })

                    primary = req.body.primaryNumber;
                   secondary = req.body.secondaryNumber;
                    other = req.body.otherNumber;
                    contactregister.contactNumber.push({primary,secondary,other,lastmodified})

                    primary = req.body.primaryEmail
                    alternate = req.body.alternateEmail;
                    contactregister.email.push({ primary, alternate,lastmodified })

                    addressLine1 = req.body.permanentAddressLine1;
                    addressLine2 = req.body.permanentAddressLine2;
                    city = req.body.permanentCity;
                    district = req.body.permanentDistrict;

                    state = req.body.permanentState;
                    pinCode = req.body.permanentPinCode;
                    country = req.body.permanentCountry;
                    contactregister.permanentAddress.push({ addressLine1, addressLine2, city, district, state, pinCode, country,lastmodified})


                    contactregister.currentAddress.addressLine1 = req.body.currentAddressLine1;
                    contactregister.currentAddress.addressLine2 = req.body.currentAddressLine2;
                    contactregister.currentAddress.city = req.body.currentCity;

                    contactregister.currentAddress.district = req.body.currentDistrict;
                    contactregister.currentAddress.state = req.body.currentState;
                    contactregister.currentAddress.pinCode = req.body.currentPinCode;
                    contactregister.currentAddress.country = req.body.currentCountry;
                    contactregister.currentAddress.lastmodified=lastmodified;

                    addressLine1 = req.body.previousAddressLine1;
                    addressLine2 = req.body.previousAddressLine2;
                    city = req.body.previousCity;

                    district = req.body.previousDistrict;
                    state = req.body.previousState;
                    pinCode = req.body.previousPinCode;
                    country = req.body.previousCountry;
                    contactregister.previousAddress.push({ addressLine1, addressLine2, city, district, state, pinCode, country,lastmodified })

                    contactregister.governmentIdName = req.body.governmentIdName;
                    contactregister.governmentIdNumber = req.body.governmentIdNumber;
                    contactregister.governmentIdType = req.body.governmentIdType;
                    
                    

                    contactregister.aadharCardNumber = req.body.aadharCardNumber;
                    
                    
                    contactregister.authorityType = req.body.authorityType
                  

                    contactregister.save(function(err) {
                        if (err) {
                            console.log(err)
                            res.status(406).send({ status: 406, message: 'Invalid data' })
                        } else {
                            Login.update({ paperflowId: req.decoded.paperflowId }, { $set: { status: '5' } }, function(err, daa) {
                                console.log(daa)
                            })
                            res.json({ status: 5, success: true, message: 'save and upload reqiured document' })


                            res.end();


                        }

                    });


                }
                else{
                    console.log(err)
                    res.json({ success: false, message: 'null' })
                }
            } else {
                res.json({ success: false, message: 'not found' })
            } //if
        });
    } //else
