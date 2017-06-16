var express = require('express');
var student = express();
var mongoose = require('mongoose');
var studentrouter = express.Router();
var Student_Login = require('../../../models/student_login');
var Student = require('../../../models/student');
var currentdate = require('../../../config/currentdate')

exports.post = function(req, res) {

    function editProfile(paperflowId) {

        return new Promise(function(resolve, reject) {

            Student_Login.findOne({ "email.email": req.decoded.email }, function(err, logindata) {
                //console.log(logindata)
                //console.log([logindata.otp.length - 1])
                var lastOtpObj = logindata.otp[logindata.otp.length - 1]
                //console.log(lastOtpObj)
                var otpdata=lastOtpObj.code
                //console.log(otpdata)
                //Student_Login.aggregate([{ $match: { "email.email": req.decoded.email } }, { "$project": { "otp": { "$slice": ["$otp", -1] } } }], function(err, otpdata) {
                    if (otpdata !== null) {

                        if (otpdata == req.body.otp) {
                             console.log(req.decoded)

                            Student.findOne({ "email.primary": req.decoded.email }, function(err, student) {
                                    if (student !== null) {

                                       
                                        console.log(student)

                                        student.firstName = req.body.firstName;
                                        student.middleName = req.body.middleName;
                                        student.lastName = req.body.lastName;

                                        dob = req.body.dateOfBirth;
                                        lastModified = currentdate.currentdate();
                                        student.dateOfBirth.push({ dob, lastModified })

                                        student.gender = req.body.gender;

                                        student.nationality = req.body.nationality;

                                        fatherFirstName = req.body.fatherFirstName;
                                        fatherMiddleName = req.body.fatherMiddleName;
                                        fatherLastName = req.body.fatherLastName;
                                        fatherEmail = req.body.fatherEmail;
                                        student.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail, lastModified })

                                        motherFirstName = req.body.motherFirstName;
                                        motherMiddleName = req.body.motherMiddleName;
                                        motherLastName = req.body.motherLastName;
                                        motherEmail = req.body.motherEmail;
                                        student.mother.push({ motherFirstName, motherMiddleName, motherLastName, motherEmail, lastModified })

                                        student.maritalStatus = req.body.maritalStatus;

                                        hsStatus = req.body.hsStatus;
                                        hsFirstName = req.body.hsFirstName;
                                        hsMiddleName = req.body.hsMiddleName;
                                        hsLastName = req.body.hsLastName;
                                        hsEmail = req.body.hsEmail;
                                        student.typeHs.push({ hsStatus, hsFirstName, hsMiddleName, hsLastName, hsEmail, lastModified })

                                        primary = req.body.primaryNumber;
                                        secondary = req.body.secondaryNumber;
                                        other = req.body.otherNumber;
                                        lastModified = currentdate.currentdate();
                                        student.contactNumber.push({ primary, secondary, other, lastModified })


                                        alternate = req.body.alternateEmail;
                                        student.email.push({ alternate, lastModified })

                                        addressLine1 = req.body.permanentAddressLine1;
                                        addressLine2 = req.body.permanentAddressLine2;
                                        city = req.body.permanentCity;
                                        district = req.body.permanentDistrict;
                                        state = req.body.permanentState;
                                        pinCode = req.body.permanentPinCode;
                                        country = req.body.permanentCountry;
                                        lastModified = currentdate.currentdate();
                                        student.permanentAddress.push({ addressLine1, addressLine2, city, district, state, pinCode, country, lastModified })

                                        student.currentAddress.addressLine1 = req.body.currentAddressLine1;
                                        student.currentAddress.addressLine2 = req.body.currentAddressLine2;
                                        student.currentAddress.city = req.body.currentCity;
                                        student.currentAddress.district = req.body.currentDistrict;
                                        student.currentAddress.state = req.body.currentState;
                                        student.currentAddress.pinCode = req.body.currentPinCode;
                                        student.currentAddress.country = req.body.currentCountry;
                                        student.lastModified = currentdate.currentdate();

                                        addressLine1 = req.body.previousAddressLine1;
                                        addressLine2 = req.body.previousAddressLine2;
                                        city = req.body.previousCity;
                                        district = req.body.previousDistrict;
                                        state = req.body.previousState;
                                        pinCode = req.body.previousPinCode;
                                        country = req.body.previousCountry;
                                        lastModified = currentdate.currentdate();
                                        student.previousAddress.push({ addressLine1, addressLine2, city, district, state, pinCode, country, lastModified })



                                        student.save(function(err, data) {
                                            if (!err) {
                                                resolve({ success: true, message: "Student Changes Save" });

                                            } else {

                                                reject({ success: false, message: err });
                                            }
                                        })
                                    } else {
                                        reject({ success: false, message: "Student not found" });
                                    }
                                }) //student
                        } else {
                            reject({ "success": false, message: "OTP does not match" });
                        }
                    } else {
                        reject({ "success": false, message: "OTP not found" });
                    }
                })

            })
        //})
    }

    var editProfileDetail = editProfile(req.decoded.paperflowId)
    editProfileDetail.then(function(msg) {
        res.json(msg)
    }, function(err) {
        res.json(err)
    })
}
