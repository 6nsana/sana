var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_int_Register = require('../../../models/training_ins');

var Student = require('../../../models/student');

exports.post = function(req, res) {


        token = req.headers.token;
        if (token) {
            jwt.verify(token, 'superSecret', function(err, decoded) {
                //console.log(decoded)

                if (err) {
                    return res.status(401).send({ status: 401, message: 'Failed to authenticate token.' });

                } else {

                    Training_int_Register.findOne({ paperflowId: decoded.paperflowId }, function(err, data) {
//console.log(data)
                        var certificate = new Student()
                        certificate.typeOfOrganization = data.typeOfOrganization
                        certificate.nameOfOrganization = data.nameOfOrganization
                        
                        certificate.	firstName = req.body.first_name;

                        certificate.lastName = req.body.last_name;
                        certificate.dateOfBirth = req.body.date_of_birth;
                        certificate.gender = req.body.gender;
                        certificate.nationality = req.body.nationality;
                        certificate.fatherName = req.body.father_name;
                        certificate.fatherEmail = req.body.fatherEmail;
                        certificate.motherName = req.body.motherName;
                        certificate.motherEmail = req.body.motherEmail;
                        certificate.maritalStatus = req.body.maritalStatus;

                        certificate.typeHs.hsStatus = req.body.hsStatus;
                        certificate.typeHs.name = req.body.type_name;
                        certificate.typeHs.email = req.body.type_email;
                        certificate.contactNumber.primary = req.body.primary_no;
                        certificate.contactNumber.secondary = req.body.secondary_no;
                        certificate.contactNumber.other = req.body.other_no;
                        certificate.email.primary = req.body.primary_email;
                        certificate.email.alternate = req.body.alternate_email;
                        certificate.permanentAddress.address1 = req.body.permanentAddress1;
                        certificate.permanentAddress.addressLine2 = req.body.permanentAddressLine2;
                        certificate.permanentAddress.city = req.body.permanent_city;
                        certificate.permanentAddress.district = req.body.permanent_district;

                        certificate.permanentAddress.state = req.body.permanent_state;
                        certificate.permanentAddress.pinCode = req.body.permanent_pinCode;
                        certificate.permanentAddress.country = req.body.permanent_country;
                        certificate.currentAddress.address1 = req.body.currentAddress1;
                        certificate.currentAddress.addressLine2 = req.body.currentAddressLine2;
                        certificate.currentAddress.city = req.body.current_city;
                        certificate.currentAddress.district = req.body.current_district;

                        certificate.currentAddress.state = req.body.current_state;
                        certificate.currentAddress.pinCode = req.body.current_pinCode;
                        certificate.currentAddress.country = req.body.current_country;
                        certificate.previousAddress.address1 = req.body.previousAddress1;
                        certificate.previousAddress.addressLine2 = req.body.previousAddressLine2;
                        certificate.previousAddress.city = req.body.previous_city;
                        certificate.previousAddress.district = req.body.previous_district;


                        certificate.previousAddress.state = req.body.previous_state;
                        certificate.previousAddress.pinCode = req.body.previous_pinCode;
                        certificate.previousAddress.country = req.body.previous_country;
                        
                        certificate.aadhar_card = req.body.aadhar_card;

                        certificate.governmentIdDetail.government_id_name = req.body.government_id_name;
                        certificate.governmentIdDetail.governmentIdNumber = req.body.government_id;

                        studentId = req.body.student_id;
                        issuedDate = req.body.issued_date;
                        nameOfCertificate = req.body.name_of_certificate;
                        typeOfCourse = req.body.type_of_course; //array
                        courseName = req.body.courseName; //array
                        duration = req.body.duration; //array
                        version = '1';
                        certStatus = "false";



                        var update = new Date().getTime();
                            var pid = update;
                            certificate.paperflowId = pid;
                            

//console.log("aadhar_card",req.body.aadhar_card.length)

                        if (req.body.aadhar_card.length != 0)

                        {

                            Student.findOne({ aadhar_card: req.body.aadhar_card }, function(err, card) {
                                //console.log(card)


                                if (card == null || card == undefined || card == "") {
                                    Student.findOne({ "governmentIdDetail.government_id": req.body.governmentIdNumber }, function(err, gov) {
                                        // console.log(gov.government_id)
                                        if (gov == null || gov == undefined || gov == '') {
                                            Student.findOne({ "email.primary": req.body.primary_email }, function(err, pri) {
                                                //console.log(pri)
                                                //console.log(pri.primary_email)
                                                if (pri == null || pri == undefined || pri == '') {
                                                    Student.findOne({ "email.alternate": req.body.alternate_email }, function(err, mail) {
                                                        if (mail == null || mail == undefined || mail == '') {
                                                            Student.findOne({ $and: [{ first_name: req.body.	firstName },{ father_name: req.body.fatherName },{ motherName: req.body.motherName }, { date_of_birth: req.body.dateOfBirth }] }, function(err, name) {
                                                                if (name == null || name == undefined || name == '') {

                                                                    //                            Training_com_Register.findOne({$and:[{paperflowId : decoded.paperflowId},{"course.name":req.body.courseName}]}, function(err, course) {    
                                                                    // certificate.certificate.duration=
                                                                    //                            certificate.certificate.name_of_certificate=
                                                                   data.student.push({paperflowId})
                                                                     data.save()
                                                                    certificate.aadhar_card = req.body.aadhar_card;
                                                                    certificate.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                                                    certificate.save(function(err) {
                                                                        if (!err) {
                                                                            res.json({ success: true, message: "Student not found. Create student" });
                                                                            res.end()
                                                                        } else {
                                                                            res.json({ success: false, message: err });
                                                                            res.end()
                                                                        }
                                                                    })

                                                                } else {
                                                                    
                                                                      paperflowId=name.paperflowId
                                                                     data.student.push({paperflowId})
                                                                        data.save()
                                                                    name.aadhar_card = req.body.aadhar_card;
                                                                    name.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                                                    name.save(function(err) {

                                                                        if (!err) {
                                                                            res.json({ success: true, message: "Student found by name.Certificate save" });
                                                                            res.end()
                                                                        } else {
                                                                            res.json({ success: false, message: err });
                                                                            res.end()
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        } else {
                                                              paperflowId=mail.paperflowId
                                                             data.student.push({paperflowId})
                                                            data.save()
                                                             mail.aadhar_card = req.body.aadhar_card;          
                                                            mail.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                                            mail.save(function(err) {

                                                                if (!err) {

                                                                    res.json({ success: true, message: "Student found by alternate email.Certificate save" });
                                                                    res.end()
                                                                } else {
                                                                    res.json({ success: false, message: err });
                                                                    res.end()
                                                                }
                                                            })
                                                        }
                                                    })
                                                } else {
                                                     paperflowId=pri.paperflowId
                                                    data.student.push({paperflowId})
                                                     data.save()
                                                    pri.aadhar_card = req.body.aadhar_card;
                                                    pri.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                                    pri.save(function(err) {

                                                        if (!err) {
                                                            res.json({ success: true, message: "Student found by primary email.Certificate save" });
                                                            res.end()
                                                        } else {

                                                            res.json({ success: false, message: err });
                                                            res.end()
                                                        }
                                                    })

                                                }
                                            })
                                        } else {
                                              paperflowId=gov.paperflowId
                                             data.student.push({paperflowId})
                                            data.save()
                                             gov.aadhar_card = req.body.aadhar_card;       
                                            gov.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                            gov.save(function(err) {

                                                if (!err) {

                                                    res.json({ success: true, message: "Student found by government id .Certificate save" });
                                                    res.end()
                                                } else {

                                                    res.json({ success: false, message: err });
                                                    res.end()
                                                }
                                            })


                                        }
                                    })
                                } else {
                                       paperflowId=card.paperflowId
                                     data.student.push({paperflowId})
                                      data.save()
                                    card.aadhar_card = req.body.aadhar_card;
                                    card.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                    card.save(function(err) {

                                        if (!err) {
                                            res.json({ success: true, message: "Student found by aadhar card.Certificate save" });
                                            res.end()
                                        } else {

                                            res.json({ success: false, message: err });
                                            res.end()
                                        }
                                    })
                                } //else
                            })
                        } else if (req.body.aadhar_card.length == 0 ) {
                            
                            Student.findOne({ "governmentIdDetail.government_id": req.body.governmentIdNumber }, function(err, gov) {
                               
                                if (gov == null || gov == undefined || gov == '') {
                                    Student.findOne({ "email.primary": req.body.primary_email }, function(err, pri) {
                                   
                                        if (pri == null || pri == undefined || pri == '') {
                                            Student.findOne({ "email.alternate": req.body.alternate_email }, function(err, mail) {
                                                if (mail == null || mail == undefined || mail == '') {
                                                    Student.findOne({ $and: [{ first_name: req.body.	firstName }, { father_name: req.body.fatherName }, { motherName: req.body.motherName }, { date_of_birth: req.body.dateOfBirth }] }, function(err, name) {
                                                        if (name == null || name == undefined || name == '') {

                                                            //                            Training_com_Register.findOne({$and:[{paperflowId : decoded.paperflowId},{"course.name":req.body.courseName}]}, function(err, course) {    
                                                            // certificate.certificate.duration=
                                                            //                            certificate.certificate.name_of_certificate=
                                                            data.student.push({paperflowId})
                                                             data.save()
                                                            certificate.aadhar_card = req.body.aadhar_card;
                                                            certificate.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                                            certificate.save(function(err) {
                                                                if (!err) {
                                                                    res.json({ success: true, message: "Student not found. Create student" });
                                                                    res.end()
                                                                } else {
                                                                    res.json({ success: false, message: err });
                                                                    res.end()
                                                                }
                                                            })

                                                        } else {
                                                            paperflowId=name.paperflowId
                                                             data.student.push({paperflowId})
                                                             data.save()
                                                            name.aadhar_card = req.body.aadhar_card;
                                                            name.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                                            name.save(function(err) {

                                                                if (!err) {
                                                                    res.json({ success: true, message: "Student found by name.Certificate save" });
                                                                    res.end()
                                                                } else {
                                                                    res.json({ success: false, message: err });
                                                                    res.end()
                                                                }
                                                            })
                                                        }
                                                    })
                                                } else {
                                                     paperflowId=mail.paperflowId
                                                     data.student.push({paperflowId})
                                                    data.save()
                                                    mail.aadhar_card = req.body.aadhar_card;
                                                    mail.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                                    mail.save(function(err) {

                                                        if (!err) {

                                                            res.json({ success: true, message: "Student found by alternate email.Certificate save" });
                                                            res.end()
                                                        } else {
                                                            res.json({ success: false, message: err });
                                                            res.end()
                                                        }
                                                    })
                                                }
                                            })
                                        } else {
                                                 paperflowId=pri.paperflowId
                                             data.student.push({paperflowId})
                                      data.save()
                                            pri.aadhar_card = req.body.aadhar_card;
                                            pri.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                            pri.save(function(err) {

                                                if (!err) {
                                                    res.json({ success: true, message: "Student found by primary email.Certificate save" });
                                                    res.end()
                                                } else {

                                                    res.json({ success: false, message: err });
                                                    res.end()
                                                }
                                            })

                                        }
                                    })
                                } else {
                                    paperflowId=gov.paperflowId
                                     data.student.push({paperflowId})
                                      data.save()
                                    gov.aadhar_card = req.body.aadhar_card;
                                    gov.certificate.push({ student_id, issuedDate, name_of_certificate, typeOfCourse, courseName, duration, version, certStatus })
                                    gov.save(function(err) {

                                        if (!err) {

                                            res.json({ success: true, message: "Student found by government id .Certificate save" });
                                            res.end()
                                        } else {

                                            res.json({ success: false, message: err });
                                            res.end()
                                        }
                                    })


                                }
                            })
                        }//else

                    })
                } //else
            })
        } //token
    } //export
