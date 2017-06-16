var express = require('express');
var util=require('../../../util.js');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_com_Register = require('../../../models/training_company');
var ContactRegister = require('../../../models/contact');
var Student = require('../../../models/student');

exports.post = function(req, res) {


Training_com_Register.findOne({$or:[{ paperflowId: req.decoded.paperflowId},{ subuser: { $elemMatch:{paperflowId:req.decoded.paperflowId}} }] }, function(err, data) {
console.log(req.decoded.paperflowId)
console.log(data)
                                var certificate = new Student()

                                typeOfOrganization = data.typeOfOrganization
                                nameOfOrganization = data.nameOfOrganization
                                paperflowId=req.decoded.paperflowId
                                startDate= new Date()
                               certificate.organization.push({typeOfOrganization,nameOfOrganization,paperflowId,startDate})


                                certificate.firstName = req.body.firstName;

                                certificate.lastName = req.body.lastName;
                                DOB = req.body.dateOfBirth;
                                certificate.dateOfBirth.push({DOB})

                                certificate.gender = req.body.gender;
                                certificate.nationality = req.body.nationality;
                                fatherName = req.body.fatherName;
                                fatherEmail = req.body.fatherEmail;
                                certificate.father.push({fatherName,fatherEmail})

                                motherName = req.body.motherName;
                                motherEmail = req.body.motherEmail;
                                certificate.mother.push({motherName,motherEmail})

                                certificate.maritalStatus = req.body.maritalStatus;

                                hsStatus = req.body.hsStatus;
                                hsFirstName = req.body.hsFirstName;
                                hsLastName=req.body.hsLastName;
                                hsEmail = req.body.hsEmail;
                                hsDOB=req.body.hsDOB
                                certificate.typeHs.push({hsStatus,hsFirstName,hsLastName,hsEmail,hsDOB})

                                primary = parseInt(req.body.primaryNumber);
                                secondary = parseInt(req.body.secondaryNumber);
                                other = parseInt(req.body.otherNumber);
                                lastmodified=new Date()
                                certificate.contactNumber.push({primary,secondary,other,lastmodified})
                                
                                primary = req.body.primaryEmail;
                                alternate =req.body.alternateEmail;
                                certificate.email.push({primary,alternate})

                                addressLine1 = req.body.permanentAddressLine1;
                                addressLine2 = req.body.permanentAddressLine2;
                                city = req.body.permanentCity;
                                district = req.body.permanentDistrict;

                                state = req.body.permanentState;
                                pinCode = parseInt(req.body.permanentPinCode);
                                country = req.body.permanentCountry;
                                lastmodified=new Date()
                                certificate.permanentAddress.push({addressLine1,addressLine2,city,district,state,pinCode,country,lastmodified})

                                certificate.currentAddress.addressLine1 = req.body.currentAddressLine1;
                                certificate.currentAddress.addressLine2 = req.body.currentAddressLine2;
                                certificate.currentAddress.city = req.body.currentCity;
                                certificate.currentAddress.district = req.body.currentDistrict;
                                certificate.currentAddress.state = req.body.currentState;
                                certificate.currentAddress.pinCode = parseInt(req.body.currentPinCode);
                                certificate.currentAddress.country = req.body.currentCountry;
                                certificate.lastmodified=new Date()

                                addressLine1 = req.body.previousAddressLine1;
                                addressLine2 = req.body.previousAddressLine2;
                                city = req.body.previousCity;
                                district = req.body.previousDistrict;
                                state = req.body.previousState;
                                pinCode = parseInt(req.body.previousPinCode);
                                country = req.body.previousCountry;
                                certificate.previousAddress.push({addressLine1,addressLine2,city,district,state,pinCode,country,lastmodified})

                                aadharCardNumber = req.body.aadharCardNumber;
                                certificate.aadharCard.push({aadharCardNumber})

                                governmentIdName = req.body.governmentIdName;
                                governmentIdNumber = req.body.governmentIdNumber;
                                governmentType=req.body.governmentType;
                                certificate.governmentIdDetail.push({governmentIdName,governmentIdNumber,governmentType,lastmodified})
                                
                                
                                nameOfCertificate = req.body.nameOfCertificate;
                                typeOfCourse = req.body.typeOfCourse; 
                                courseName = req.body.courseName; 
                                duration = req.body.duration;
                                version = "1";
                                certStatus = "false";



                                var update = new Date().getTime();
                                var pid = update;
                                certificate.paperflowId = pid;
                                //console.log("aadharCard",req.body.aadharCard.length)
                                paperflowId = pid;

                                if (req.body.aadharCard.length != 0)

                                {

                                    Student.findOne({ aadharCard: req.body.aadharCard }, function(err, card) {
                                        //console.log(card)


                                        if (card == null || card == undefined || card == "") {
                                            Student.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, gov) {
                                                // console.log(gov.governmentIdNumber)
                                                if (gov == null || gov == undefined || gov == '') {
                                                    Student.findOne({ "email.primary": req.body.primaryEmail }, function(err, pri) {
                                                        //console.log(pri)
                                                        //console.log(pri.primaryEmail)
                                                        if (pri == null || pri == undefined || pri == '') {
                                                            Student.findOne({ "email.alternate": req.body.alternateEmail }, function(err, mail) {
                                                                if (mail == null || mail == undefined || mail == '') {
                                                                    Student.findOne({ $and: [{ firstName: req.body.firstName }, { fatherName: req.body.fatherName }, { motherName: req.body.motherName }, { dateOfBirth: req.body.dateOfBirth }] }, function(err, name) {
                                                                        if (name == null || name == undefined || name == '') {

                                                                            //                            Training_com_Register.findOne({$and:[{paperflowId : decoded.paperflowId},{"course.name":req.body.courseName}]}, function(err, course) {    
                                                                            // certificate.certificate.duration=
                                                                            //                            certificate.certificate.nameOfCertificate=
                                                                            data.student.push({ paperflowId })
                                                                            data.save()
                                                                            certificate.aadharCard = req.body.aadharCard;
                                                                            certificate.certificate.push({issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
                                                                            certificate.save(function(err) {
                                                                                if (!err) {
                                                                                    //res.json({ success: true, message: "Student not found. Create student" });
                                                                                    console.log('student not found')
                                                                                } else {
                                                                                    console.log(err)
                                                                                    res.json({ success: false, message: 'Invalid data' });

                                                                                }
                                                                            })
                                                                            ContactRegister.findOne({ aadharCard: req.body.aadharCard }, function(err, cardd) {
                                                                                //console.log(cardd)


                                                                                if (cardd == null || cardd == undefined || cardd == "") {
                                                                                    ContactRegister.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, govv) {
                                                                                            // console.log(gov.governmentIdNumber)
                                                                                            if (govv == null || govv == undefined || govv == '') {
                                                                                                ContactRegister.findOne({ "email.primary": req.body.primaryEmail }, function(err, prii) {
                                                                                                        //console.log(pri)
                                                                                                        //console.log(pri.primaryEmail)
                                                                                                        if (prii == null || prii == undefined || prii == '') {
                                                                                                            ContactRegister.findOne({ "email.alternate": req.body.alternateEmail }, function(err, maill) {
                                                                                                                    if (maill == null || maill == undefined || maill == '') {
                                                                                                                        ContactRegister.findOne({ $and: [{ firstName: req.body.firstName }, { fatherName: req.body.fatherName }, { motherName: req.body.motherName }, { dateOfBirth: req.body.dateOfBirth }] }, function(err, namee) {
                                                                                                                                if (namee == null || namee == undefined || namee == '') {
                                                                                                                                    res.json({sucess:true,message:"person not found as subuser"})
                                                                                                                                    res.end()
                                                                                                                                } else {
                                                                                                                                    console.log(paperflowId)
                                                                                                                                    namee.notissueto.paperflowId = paperflowId;
                                                                                                                                    namee.save(function(err) {
                                                                                                                                        if (!err) {
                                                                                                                                        res.json({success: true,message: "Student not found. Create student"});
                                                                                                                                            console.log("saved by name as notissuedto");
                                                                                                                                            res.end()
                                                                                                                                        } else {
                                                                                                                                            console.log(err)
                                                                                                                                            console.log("not saved by name as not issuedto");
                                                                                                                                            res.end()
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                }
                                                                                                                            }) //name
                                                                                                                    } else {
                                                                                                                        maill.notissueto.paperflowId = paperflowId;
                                                                                                                        maill.save(function(err) {
                                                                                                                            if (!err) {
                                                                                                                                console.log("saved by alter mail as notissuedto");
                                                                                                                                res.end()
                                                                                                                            } else {
                                                                                                                                console.log(err)
                                                                                                                                console.log("not saved by alter mail as not issuedto");
                                                                                                                                res.end()
                                                                                                                            }
                                                                                                                        })
                                                                                                                    }
                                                                                                                }) //alter
                                                                                                        } else {
                                                                                                            prii.notissueto.paperflowId = paperflowId;
                                                                                                            prii.save(function(err) {
                                                                                                                if (!err) {
                                                                                                                    console.log("saved by pri mail as notissuedto");
                                                                                                                    res.end()
                                                                                                                } else {
                                                                                                                    console.log(err)
                                                                                                                    console.log("not saved by pri mail as not issuedto");
                                                                                                                    res.end()
                                                                                                                }
                                                                                                            })
                                                                                                        }
                                                                                                    }) //pri
                                                                                            } else {
                                                                                                govv.notissueto.paperflowId = paperflowId;
                                                                                                govv.save(function(err) {
                                                                                                    if (!err) {
                                                                                                        console.log("saved by governmentIdNumber as notissuedto");
                                                                                                        res.end()
                                                                                                    } else {
                                                                                                        console.log(err)
                                                                                                        res.json({message:"not saved by governmentIdNumber as not issuedto"});
                                                                                                        res.end()
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        }) //gov
                                                                                } else {
                                                                                    //console.log(cardd.paperflowId)
                                                                                    cardd.notissueto.paperflowId = paperflowId;
                                                                                    cardd.save(function(err) {
                                                                                        if (!err) {
                                                                                            res.json({message:"saved by aadhar as notissuedto"});
                                                                                            
                                                                                        } else {
                                                                                            console.log(err)
                                                                                            res.json({message:"not saved by aadhar as not issuedto"});
                                                                                            res.end()
                                                                                        }
                                                                                    })

                                                                                }
                                                                            })



                                                                        } else {
                                                                            paperflowId = name.paperflowId
                                                                            data.student.push({ paperflowId })
                                                                            data.save()
                                                                            name.aadharCard = req.body.aadharCard;
                                                                            name.certificate.push({issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
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
                                                                    paperflowId = mail.paperflowId
                                                                    data.student.push({ paperflowId })
                                                                    data.save()
                                                                    mail.aadharCard = req.body.aadharCard;
                                                                    mail.certificate.push({issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
                                                                    mail.save(function(err) {

                                                                        if (!err) {

                                                                            res.json({ success: true, message: "Student found by alternate email.Certificate save" });
                                                                            res.end()
                                                                        } else {
                                                                            res.json({ success: false, message: 'err' });
                                                                            res.end()
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        } else {
                                                            paperflowId = pri.paperflowId
                                                            data.student.push({ paperflowId })
                                                            data.save()
                                                            pri.aadharCard = req.body.aadharCard;
                                                            pri.certificate.push({issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
                                                            pri.save(function(err) {

                                                                if (!err) {
                                                                    res.json({ success: true, message: "Student found by primary email.Certificate save" });
                                                                    res.end()
                                                                } else {

                                                                    res.json({ success: false, message: 'err' });
                                                                    res.end()
                                                                }
                                                            })

                                                        }
                                                    })
                                                } else {
                                                    paperflowId = gov.paperflowId
                                                    data.student.push({ paperflowId })
                                                    data.save()
                                                    gov.aadharCard = req.body.aadharCard;
                                                    gov.certificate.push({issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
                                                    gov.save(function(err) {

                                                        if (!err) {

                                                            res.json({ success: true, message: "Student found by government id .Certificate save" });
                                                            res.end()
                                                        } else {

                                                            res.json({ success: false, message: 'err' });
                                                            res.end()
                                                        }
                                                    })


                                                }
                                            })
                                        } else {
                                            paperflowId = card.paperflowId
                                            data.student.push({ paperflowId })
                                            data.save()
                                            card.aadharCard = req.body.aadharCard;
                                            card.certificate.push({issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
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
                                } else if (req.body.aadharCard.length == 0) {

                                    Student.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, gov) {

                                        if (gov == null || gov == undefined || gov == '') {
                                            Student.findOne({ "email.primary": req.body.primaryEmail }, function(err, pri) {

                                                if (pri == null || pri == undefined || pri == '') {
                                                    Student.findOne({ "email.alternate": req.body.alternateEmail }, function(err, mail) {
                                                        if (mail == null || mail == undefined || mail == '') {
                                                            Student.findOne({ $and: [{ firstName: req.body.firstName }, { fatherName: req.body.fatherName }, { motherName: req.body.motherName }, { dateOfBirth: req.body.dateOfBirth }] }, function(err, name) {
                                                                if (name == null || name == undefined || name == '') {

                                                                    //                            Training_com_Register.findOne({$and:[{paperflowId : decoded.paperflowId},{"course.name":req.body.courseName}]}, function(err, course) {    
                                                                    // certificate.certificate.duration=
                                                                    //                            certificate.certificate.nameOfCertificate=
                                                                    data.student.push({ paperflowId })
                                                                    data.save()
                                                                    certificate.aadharCard = req.body.aadharCard;
                                                                    certificate.certificate.push({ issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
                                                                    certificate.save(function(err) {
                                                                        if (!err) {
                                                                            res.json({ success: true, message: "Student not found. Create student" });
                                                                            
                                                                        } else {
                                                                            res.json({ success: false, message: 'err' });
                                                                            
                                                                        }
                                                                    })
                                                                    ContactRegister.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, govv) {
                                                                            // console.log(gov.governmentIdNumber)
                                                                            if (govv == null || govv == undefined || govv == '') {
                                                                                ContactRegister.findOne({ "email.primary": req.body.primaryEmail }, function(err, prii) {
                                                                                        //console.log(pri)
                                                                                        //console.log(pri.primaryEmail)
                                                                                        if (prii == null || prii == undefined || prii == '') {
                                                                                            ContactRegister.findOne({ "email.alternate": req.body.alternateEmail }, function(err, maill) {
                                                                                                    if (maill == null || maill == undefined || maill == '') {
                                                                                                        ContactRegister.findOne({ $and: [{ firstName: req.body.firstName }, { fatherName: req.body.fatherName }, { motherName: req.body.motherName }, { dateOfBirth: req.body.dateOfBirth }] }, function(err, namee) {
                                                                                                                if (namee == null || namee == undefined || namee == '') {
                                                                                                                    res.json({sucess:true,message:"person not found as subuser"})
                                                                                                                    res.end()
                                                                                                                } else {
                                                                                                                    namee.notissueto.paperflowId = paperflowId;
                                                                                                                    namee.save(function(err) {
                                                                                                                        if (!err) {
                                                                                                                            console.log("saved by name as notissuedto");
                                                                                                                            res.end()
                                                                                                                        } else {
                                                                                                                            console.log(err)
                                                                                                                            console.log("not saved by name as not issuedto");
                                                                                                                            res.end()
                                                                                                                        }
                                                                                                                    })
                                                                                                                }
                                                                                                            }) //name
                                                                                                    } else {
                                                                                                        maill.notissueto.paperflowId = paperflowId;
                                                                                                        maill.save(function(err) {
                                                                                                            if (!err) {
                                                                                                                console.log("saved by alter mail as notissuedto");
                                                                                                                res.end()
                                                                                                            } else {
                                                                                                                console.log(err)
                                                                                                                console.log("not saved by alter mail as not issuedto");
                                                                                                                res.end()
                                                                                                            }
                                                                                                        })
                                                                                                    }
                                                                                                }) //alter
                                                                                        } else {
                                                                                            prii.notissueto.paperflowId = paperflowId;
                                                                                            prii.save(function(err) {
                                                                                                if (!err) {
                                                                                                    console.log("saved by pri mail as notissuedto");
                                                                                                    res.end()
                                                                                                } else {
                                                                                                    console.log(err)
                                                                                                    console.log("not saved by pri mail as not issuedto");
                                                                                                    res.end()
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    }) //pri
                                                                            } else {
                                                                                // console.log(govv.paperflowId)
                                                                                govv.notissueto.paperflowId = paperflowId;
                                                                                govv.save(function(err) {
                                                                                    if (!err) {
                                                                                        console.log("saved by governmentIdNumber as notissuedto");
                                                                                        res.end()
                                                                                    } else {
                                                                                        console.log(err)
                                                                                        console.log("not saved by governmentIdNumber as not issuedto");
                                                                                        res.end()
                                                                                    }
                                                                                })
                                                                            }
                                                                        }) //gov










                                                                } else {
                                                                    paperflowId = name.paperflowId
                                                                    data.student.push({ paperflowId })
                                                                    data.save()
                                                                    name.aadharCard = req.body.aadharCard;
                                                                    name.certificate.push({ issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
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
                                                            paperflowId = mail.paperflowId
                                                            data.student.push({ paperflowId })
                                                            data.save()
                                                            mail.aadharCard = req.body.aadharCard;
                                                            mail.certificate.push({issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus ,lastmodified})
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
                                                    paperflowId = pri.paperflowId
                                                    data.student.push({ paperflowId })
                                                    data.save()
                                                    pri.aadharCard = req.body.aadharCard;
                                                    pri.certificate.push({ issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
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
                                            paperflowId = gov.paperflowId
                                            data.student.push({ paperflowId })
                                            data.save()
                                            gov.aadharCard = req.body.aadharCard;
                                            gov.certificate.push({issuedDate, nameOfCertificate, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
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
                                } //elseif

                            }) //train_c
            
        
    } //export



// exports.apost = function(req, res) {
//         console.log(req.body.aadharCard)
//         Student.findOne({ aadharCard: req.body.aadharCard }, function(err, certificate) {

//             console.log(req.body.aadharCard)
//             console.log(certificate)
//             if (req.body.aadharCard != null)

//             {

//                 ContactRegister.findOne({ aadharCard: req.body.aadharCard }, function(err, cardd) {
//                         console.log(cardd)


//                         if (cardd == null || cardd == undefined || cardd == "") {
//                             ContactRegister.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, govv) {
//                                     // console.log(gov.governmentIdNumber)
//                                     if (govv == null || govv == undefined || govv == '') {
//                                         ContactRegister.findOne({ "email.primary": req.body.primaryEmail }, function(err, prii) {
//                                                 //console.log(pri)
//                                                 //console.log(pri.primaryEmail)
//                                                 if (prii == null || prii == undefined || prii == '') {
//                                                     ContactRegister.findOne({ "email.alternate": req.body.alternateEmail }, function(err, maill) {
//                                                             if (maill == null || maill == undefined || maill == '') {
//                                                                 ContactRegister.findOne({ $and: [{ firstName: req.body.	firstName }, { fatherName: req.body.fatherName }, { motherName: req.body.motherName }, { dateOfBirth: req.body.dateOfBirth }] }, function(err, namee) {
//                                                                         if (namee == null || namee == undefined || namee == '') {
//                                                                             console.log("person not found as subuser")
//                                                                         } else {
//                                                                             certificate.notissueby.paperflowId = namee.paperflowId;
//                                                                             certificate.save(function(err) {
//                                                                                 if (!err) {
//                                                                                     console.log("saved by name as notissuedby");
//                                                                                     res.end()
//                                                                                 } else {
//                                                                                     console.log(err)
//                                                                                     console.log("not saved by name as not issuedby");
//                                                                                     res.end()
//                                                                                 }
//                                                                             })
//                                                                         }
//                                                                     }) //name
//                                                             } else {
//                                                                 certificate.notissueby.paperflowId = maill.paperflowId;
//                                                                 certificate.save(function(err) {
//                                                                     if (!err) {
//                                                                         console.log("saved by alter mail as notissuedby");
//                                                                         res.end()
//                                                                     } else {
//                                                                         console.log(err)
//                                                                         console.log("not saved by alter mail as not issuedby");
//                                                                         res.end()
//                                                                     }
//                                                                 })
//                                                             }
//                                                         }) //alter
//                                                 } else {
//                                                     certificate.notissueby.paperflowId = prii.paperflowId;
//                                                     certificate.save(function(err) {
//                                                         if (!err) {
//                                                             console.log("saved by pri mail as notissuedby");
//                                                             res.end()
//                                                         } else {
//                                                             console.log(err)
//                                                             console.log("not saved by pri mail as not issuedby");
//                                                             res.end()
//                                                         }
//                                                     })
//                                                 }
//                                             }) //pri
//                                     } else {
//                                         certificate.notissueby.paperflowId = govv.paperflowId;
//                                         certificate.save(function(err) {
//                                             if (!err) {
//                                                 console.log("saved by governmentIdNumber as notissuedby");
//                                                 res.end()
//                                             } else {
//                                                 console.log(err)
//                                                 console.log("not saved by governmentIdNumber as not issuedby");
//                                                 res.end()
//                                             }
//                                         })
//                                     }
//                                 }) //gov
//                         } else {
//                             console.log(cardd.paperflowId)
//                             certificate.notissueby.paperflowId = cardd.paperflowId;
//                             certificate.save(function(err) {
//                                 if (!err) {
//                                     console.log("saved by aadhar as notissuedby");
//                                     res.end()
//                                 } else {
//                                     console.log(err)
//                                     console.log("not saved by aadhar as not issuedby");
//                                     res.end()
//                                 }
//                             })

//                         }
//                     }) //aadhar ///if
//             } else if (req.body.aadharCard == null) {

//                 ContactRegister.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, govv) {
//                         // console.log(gov.governmentIdNumber)
//                         if (govv == null || govv == undefined || govv == '') {
//                             ContactRegister.findOne({ "email.primary": req.body.primaryEmail }, function(err, prii) {
//                                     //console.log(pri)
//                                     //console.log(pri.primaryEmail)
//                                     if (prii == null || prii == undefined || prii == '') {
//                                         ContactRegister.findOne({ "email.alternate": req.body.alternateEmail }, function(err, maill) {
//                                                 if (maill == null || maill == undefined || maill == '') {
//                                                     ContactRegister.findOne({ $and: [{ firstName: req.body.	firstName }, { fatherName: req.body.fatherName }, { motherName: req.body.motherName }, { dateOfBirth: req.body.dateOfBirth }] }, function(err, namee) {
//                                                             if (namee == null || namee == undefined || namee == '') {
//                                                                 console.log("person not found as subuser")
//                                                             } else {
//                                                                 certificate.notissueby.paperflowId = namee.paperflowId;
//                                                                 certificate.save(function(err) {
//                                                                     if (!err) {
//                                                                         console.log("saved by name as notissuedby");
//                                                                         res.end()
//                                                                     } else {
//                                                                         console.log(err)
//                                                                         console.log("not saved by name as not issuedby");
//                                                                         res.end()
//                                                                     }
//                                                                 })
//                                                             }
//                                                         }) //name
//                                                 } else {
//                                                     certificate.notissueby.paperflowId = maill.paperflowId;
//                                                     certificate.save(function(err) {
//                                                         if (!err) {
//                                                             console.log("saved by alter mail as notissuedby");
//                                                             res.end()
//                                                         } else {
//                                                             console.log(err)
//                                                             console.log("not saved by alter mail as not issuedby");
//                                                             res.end()
//                                                         }
//                                                     })
//                                                 }
//                                             }) //alter
//                                     } else {
//                                         certificate.notissueby.paperflowId = prii.paperflowId;
//                                         certificate.save(function(err) {
//                                             if (!err) {
//                                                 console.log("saved by pri mail as notissuedby");
//                                                 res.end()
//                                             } else {
//                                                 console.log(err)
//                                                 console.log("not saved by pri mail as not issuedby");
//                                                 res.end()
//                                             }
//                                         })
//                                     }
//                                 }) //pri
//                         } else {
//                             // console.log(govv.paperflowId)
//                             certificate.notissueby.paperflowId = govv.paperflowId;
//                             certificate.save(function(err) {
//                                 if (!err) {
//                                     console.log("saved by governmentIdNumber as notissuedby");
//                                     res.end()
//                                 } else {
//                                     console.log(err)
//                                     console.log("not saved by governmentIdNumber as not issuedby");
//                                     res.end()
//                                 }
//                             })
//                         }
//                     }) //gov
//             }
//         })
//     } //elseiif
