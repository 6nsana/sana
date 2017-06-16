var express = require('express');
var util = require('../../../util.js');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Training_com_Register = require('../../../models/training_company');
var ContactRegister = require('../../../models/contact');
var Student = require('../../../models/student');

exports.post = function(req, res) {


    Training_com_Register.findOne({ $or: [{ paperflowId: req.decoded.paperflowId }, { subuser: { $elemMatch: { paperflowId: req.decoded.paperflowId } } }] }, function(err, data) {
        console.log(req.decoded.paperflowId)
        console.log(data)
        var student = new Student()

        typeOfOrganization = data.typeOfOrganization
        nameOfOrganization = data.nameOfOrganization
        paperflowId = req.decoded.paperflowId
        startDate = new Date()
        student.organization.push({ typeOfOrganization, nameOfOrganization, paperflowId, startDate })


        student.firstName = req.body.firstName;
        student.middleName = req.body.middleName;
        student.lastName = req.body.lastName;
        dob = req.body.dateOfBirth;
        student.dateOfBirth.push({ dob })

        student.gender = req.body.gender;
        student.nationality = req.body.nationality;
        fatherFirstName = req.body.fatherFirstName;
        fatherMiddleName = req.body.fatherMiddleName;
        fatherLastName = req.body.fatherLastName;
        fatherEmail = req.body.fatherEmail;
        student.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail })

        motherFirstName = req.body.motherFirstName;
        motherMiddleName = req.body.motherMiddleName;
        motherLastName = req.body.motherLastName;
        motherEmail = req.body.motherEmail;
        student.mother.push({ motherFirstName, motherMiddleName, motherLastName, motherEmail })

        student.maritalStatus = req.body.maritalStatus;

        hsStatus = req.body.hsStatus;
        hsFirstName = req.body.hsFirstName;
        hsMiddleName = req.body.hsMiddleName;
        hsLastName = req.body.hsLastName;
        hsEmail = req.body.hsEmail;

        student.typeHs.push({ hsStatus, hsFirstName, hsMiddleName, hsLastName, hsEmail })

        primary = parseInt(req.body.primaryNumber);
        secondary = parseInt(req.body.secondaryNumber);
        other = parseInt(req.body.otherNumber);
        lastmodified = new Date()
        student.contactNumber.push({ primary, secondary, other, lastmodified })

        primary = req.body.primaryEmail;
        alternate = req.body.alternateEmail;
        student.email.push({ primary, alternate })

        addressLine1 = req.body.permanentAddressLine1;
        addressLine2 = req.body.permanentAddressLine2;
        city = req.body.permanentCity;
        district = req.body.permanentDistrict;

        state = req.body.permanentState;
        pinCode = parseInt(req.body.permanentPinCode);
        country = req.body.permanentCountry;
        lastmodified = new Date()
        student.permanentAddress.push({ addressLine1, addressLine2, city, district, state, pinCode, country, lastmodified })

        student.currentAddress.addressLine1 = req.body.currentAddressLine1;
        student.currentAddress.addressLine2 = req.body.currentAddressLine2;
        student.currentAddress.city = req.body.currentCity;
        student.currentAddress.district = req.body.currentDistrict;
        student.currentAddress.state = req.body.currentState;
        student.currentAddress.pinCode = parseInt(req.body.currentPinCode);
        student.currentAddress.country = req.body.currentCountry;
        student.lastmodified = new Date()

        addressLine1 = req.body.previousAddressLine1;
        addressLine2 = req.body.previousAddressLine2;
        city = req.body.previousCity;
        district = req.body.previousDistrict;
        state = req.body.previousState;
        pinCode = parseInt(req.body.previousPinCode);
        country = req.body.previousCountry;
        lastmodified = new Date()
        student.previousAddress.push({ addressLine1, addressLine2, city, district, state, pinCode, country, lastmodified })

        aadharCardNumber = req.body.aadharCardNumber;
        student.aadharCard.push({ aadharCardNumber })

        governmentIdName = req.body.governmentIdName;
        governmentIdNumber = req.body.governmentIdNumber;
        governmentType = req.body.governmentType;
        student.governmentIdDetail.push({ governmentIdName, governmentIdNumber, governmentType, lastmodified })


        courseName = req.body.courseName;
        typeOfCourse = req.body.typeOfCourse;
        nameOfCertificate = req.body.nameOfCertificate;
        courseName = req.body.courseName;
        duration = req.body.duration;
        version = "1";
        certStatus = "false";



        var update = new Date().getTime();
        var pid = update;
        student.paperflowId = pid;
        //console.log("aadharCard",req.body.aadharCard.length)
        paperflowId = pid;

        student.save(function(err, data) {
            if (!err) {
                res.json({ success: true, message: "Student not found. Create student" });
                console.log('student not found')
            } else {
                console.log(err)
                res.json({ success: false, message: 'Invalid data' });
            }
        })
    })
}








//     if (req.body.aadharCardNumber.length != 0)

//     {

//         Student.findOne({ "aadharCard.aadharCardNumber": req.body.aadharCardNumber }, function(err, card) {
//             //console.log(card)


//             if (card == null || card == undefined || card == "") {
//                 Student.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, gov) {
//                     // console.log(gov.governmentIdNumber)
//                     if (gov == null || gov == undefined || gov == '') {
//                         Student.findOne({ "email.primary": req.body.primaryEmail }, function(err, pri) {
//                             //console.log(pri)
//                             //console.log(pri.primaryEmail)
//                             if (pri == null || pri == undefined || pri == '') {
//                                 Student.findOne({ "email.alternate": req.body.alternateEmail }, function(err, mail) {
//                                     if (mail == null || mail == undefined || mail == '') {
//                                         Student.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName }, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, name) {
//                                             if (name == null || name == undefined || name == '') {

//                                                 //                            Training_com_Register.findOne({$and:[{paperflowId : decoded.paperflowId},{"course.name":req.body.courseName}]}, function(err, course) {    
//                                                 // student.student.duration=
//                                                 //                            student.student.nameOfstudent=
//                                                 data.student.push({ paperflowId })
//                                                 data.save()
//                                                 student.aadharCard = req.body.aadharCard;
//                                                 student.student.push({issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
//                                                 student.save(function(err) {
//                                                     if (!err) {
//                                                         //res.json({ success: true, message: "Student not found. Create student" });
//                                                         console.log('student not found')
//                                                     } else {
//                                                         console.log(err)
//                                                         res.json({ success: false, message: 'Invalid data' });

//                                                     }
//                                                 })
//                                                 ContactRegister.findOne({ aadharCardNumber: req.body.aadharCardNumber }, function(err, cardd) {
//                                                     //console.log(cardd)


//                                                     if (cardd == null || cardd == undefined || cardd == "") {
//                                                         ContactRegister.findOne({ governmentIdNumber: req.body.governmentIdNumber }, function(err, govv) {
//                                                                 // console.log(gov.governmentIdNumber)
//                                                                 if (govv == null || govv == undefined || govv == '') {
//                                                                     ContactRegister.findOne({ "email.primary": req.body.primaryEmail }, function(err, prii) {
//                                                                             //console.log(pri)
//                                                                             //console.log(pri.primaryEmail)
//                                                                             if (prii == null || prii == undefined || prii == '') {
//                                                                                 ContactRegister.findOne({ "email.alternate": req.body.alternateEmail }, function(err, maill) {
//                                                                                         if (maill == null || maill == undefined || maill == '') {
//                                                                                             ContactRegister.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName}, { "dateOfBirth.dob": req.body.dateOfBirth }] },function(err, namee) {
//                                                                                                     if (namee == null || namee == undefined || namee == '') {
//                                                                                                         res.json({sucess:true,message:"person not found as subuser"})
//                                                                                                         res.end()
//                                                                                                     } else {
//                                                                                                         console.log(paperflowId)
//                                                                                                         namee.notissueto.paperflowId = paperflowId;
//                                                                                                         namee.save(function(err) {
//                                                                                                             if (!err) {
//                                                                                                             res.json({success: true,message: "Student not found. Create student"});
//                                                                                                                 console.log("saved by name as notissuedto");
//                                                                                                                 res.end()
//                                                                                                             } else {
//                                                                                                                 console.log(err)
//                                                                                                                 console.log("not saved by name as not issuedto");
//                                                                                                                 res.end()
//                                                                                                             }
//                                                                                                         })
//                                                                                                     }
//                                                                                                 }) //name
//                                                                                         } else {
//                                                                                             maill.notissueto.paperflowId = paperflowId;
//                                                                                             maill.save(function(err) {
//                                                                                                 if (!err) {
//                                                                                                     console.log("saved by alter mail as notissuedto");
//                                                                                                     res.end()
//                                                                                                 } else {
//                                                                                                     console.log(err)
//                                                                                                     console.log("not saved by alter mail as not issuedto");
//                                                                                                     res.end()
//                                                                                                 }
//                                                                                             })
//                                                                                         }
//                                                                                     }) //alter
//                                                                             } else {
//                                                                                 prii.notissueto.paperflowId = paperflowId;
//                                                                                 prii.save(function(err) {
//                                                                                     if (!err) {
//                                                                                         console.log("saved by pri mail as notissuedto");
//                                                                                         res.end()
//                                                                                     } else {
//                                                                                         console.log(err)
//                                                                                         console.log("not saved by pri mail as not issuedto");
//                                                                                         res.end()
//                                                                                     }
//                                                                                 })
//                                                                             }
//                                                                         }) //pri
//                                                                 } else {
//                                                                     govv.notissueto.paperflowId = paperflowId;
//                                                                     govv.save(function(err) {
//                                                                         if (!err) {
//                                                                             console.log("saved by governmentIdNumber as notissuedto");
//                                                                             res.end()
//                                                                         } else {
//                                                                             console.log(err)
//                                                                             res.json({message:"not saved by governmentIdNumber as not issuedto"});
//                                                                             res.end()
//                                                                         }
//                                                                     })
//                                                                 }
//                                                             }) //gov
//                                                     } else {
//                                                         //console.log(cardd.paperflowId)
//                                                         cardd.notissueto.paperflowId = paperflowId;
//                                                         cardd.save(function(err) {
//                                                             if (!err) {
//                                                                 res.json({message:"saved by aadhar as notissuedto"});

//                                                             } else {
//                                                                 console.log(err)
//                                                                 res.json({message:"not saved by aadhar as not issuedto"});
//                                                                 res.end()
//                                                             }
//                                                         })

//                                                     }
//                                                 })



//                                             } else {
//                                                 paperflowId = name.paperflowId
//                                                 data.student.push({ paperflowId })
//                                                 data.save()
//                                                 name.aadharCard = req.body.aadharCard;
//                                                 name.student.push({issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
//                                                 name.save(function(err) {

//                                                     if (!err) {
//                                                         res.json({ success: true, message: "Student found by name.student save" });
//                                                         res.end()
//                                                     } else {
//                                                         res.json({ success: false, message: err });
//                                                         res.end()
//                                                     }
//                                                 })
//                                             }
//                                         })
//                                     } else {
//                                         paperflowId = mail.paperflowId
//                                         data.student.push({ paperflowId })
//                                         data.save()
//                                         mail.aadharCard = req.body.aadharCard;
//                                         mail.student.push({issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
//                                         mail.save(function(err) {

//                                             if (!err) {

//                                                 res.json({ success: true, message: "Student found by alternate email.student save" });
//                                                 res.end()
//                                             } else {
//                                                 res.json({ success: false, message: 'err' });
//                                                 res.end()
//                                             }
//                                         })
//                                     }
//                                 })
//                             } else {
//                                 paperflowId = pri.paperflowId
//                                 data.student.push({ paperflowId })
//                                 data.save()
//                                 pri.aadharCard = req.body.aadharCard;
//                                 pri.student.push({issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
//                                 pri.save(function(err) {

//                                     if (!err) {
//                                         res.json({ success: true, message: "Student found by primary email.student save" });
//                                         res.end()
//                                     } else {

//                                         res.json({ success: false, message: 'err' });
//                                         res.end()
//                                     }
//                                 })

//                             }
//                         })
//                     } else {
//                         paperflowId = gov.paperflowId
//                         data.student.push({ paperflowId })
//                         data.save()
//                         gov.aadharCard = req.body.aadharCard;
//                         gov.student.push({issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
//                         gov.save(function(err) {

//                             if (!err) {

//                                 res.json({ success: true, message: "Student found by government id .student save" });
//                                 res.end()
//                             } else {

//                                 res.json({ success: false, message: 'err' });
//                                 res.end()
//                             }
//                         })


//                     }
//                 })
//             } else {
//                 paperflowId = card.paperflowId
//                 data.student.push({ paperflowId })
//                 data.save()
//                 card.aadharCard = req.body.aadharCard;
//                 card.student.push({issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
//                 card.save(function(err) {

//                     if (!err) {
//                         res.json({ success: true, message: "Student found by aadhar card.student save" });
//                         res.end()
//                     } else {

//                         res.json({ success: false, message: err });
//                         res.end()
//                     }
//                 })
//             } //else
//         })
//     } else if (req.body.aadharCardNumber.length == 0) {

//         Student.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, gov) {

//             if (gov == null || gov == undefined || gov == '') {
//                 Student.findOne({ "email.primary": req.body.primaryEmail }, function(err, pri) {

//                     if (pri == null || pri == undefined || pri == '') {
//                         Student.findOne({ "email.alternate": req.body.alternateEmail }, function(err, mail) {
//                             if (mail == null || mail == undefined || mail == '') {
//                                 Student.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName }, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, name) {
//                                     if (name == null || name == undefined || name == '') {

//                                         //                            Training_com_Register.findOne({$and:[{paperflowId : decoded.paperflowId},{"course.name":req.body.courseName}]}, function(err, course) {    
//                                         // student.student.duration=
//                                         //                            student.student.nameOfstudent=
//                                         data.student.push({ paperflowId })
//                                         data.save()
//                                         student.aadharCard = req.body.aadharCard;
//                                         student.student.push({ issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
//                                         student.save(function(err) {
//                                             if (!err) {
//                                                 res.json({ success: true, message: "Student not found. Create student" });

//                                             } else {
//                                                 res.json({ success: false, message: 'err' });

//                                             }
//                                         })
//                                         ContactRegister.findOne({ "governmentIdNumber": req.body.governmentIdNumber }, function(err, govv) {
//                                                 // console.log(gov.governmentIdNumber)
//                                                 if (govv == null || govv == undefined || govv == '') {
//                                                     ContactRegister.findOne({ "email.primary": req.body.primaryEmail }, function(err, prii) {
//                                                             //console.log(pri)
//                                                             //console.log(pri.primaryEmail)
//                                                             if (prii == null || prii == undefined || prii == '') {
//                                                                 ContactRegister.findOne({ "email.alternate": req.body.alternateEmail }, function(err, maill) {
//                                                                         if (maill == null || maill == undefined || maill == '') {
//                                                                             ContactRegister.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName}, { "dateOfBirth.dob": req.body.dateOfBirth }] },function(err, namee) {
//                                                                                     if (namee == null || namee == undefined || namee == '') {
//                                                                                         res.json({sucess:true,message:"person not found as subuser"})
//                                                                                         res.end()
//                                                                                     } else {
//                                                                                         namee.notissueto.paperflowId = paperflowId;
//                                                                                         namee.save(function(err) {
//                                                                                             if (!err) {
//                                                                                                 console.log("saved by name as notissuedto");
//                                                                                                 res.end()
//                                                                                             } else {
//                                                                                                 console.log(err)
//                                                                                                 console.log("not saved by name as not issuedto");
//                                                                                                 res.end()
//                                                                                             }
//                                                                                         })
//                                                                                     }
//                                                                                 }) //name
//                                                                         } else {
//                                                                             maill.notissueto.paperflowId = paperflowId;
//                                                                             maill.save(function(err) {
//                                                                                 if (!err) {
//                                                                                     console.log("saved by alter mail as notissuedto");
//                                                                                     res.end()
//                                                                                 } else {
//                                                                                     console.log(err)
//                                                                                     console.log("not saved by alter mail as not issuedto");
//                                                                                     res.end()
//                                                                                 }
//                                                                             })
//                                                                         }
//                                                                     }) //alter
//                                                             } else {
//                                                                 prii.notissueto.paperflowId = paperflowId;
//                                                                 prii.save(function(err) {
//                                                                     if (!err) {
//                                                                         console.log("saved by pri mail as notissuedto");
//                                                                         res.end()
//                                                                     } else {
//                                                                         console.log(err)
//                                                                         console.log("not saved by pri mail as not issuedto");
//                                                                         res.end()
//                                                                     }
//                                                                 })
//                                                             }
//                                                         }) //pri
//                                                 } else {
//                                                     // console.log(govv.paperflowId)
//                                                     govv.notissueto.paperflowId = paperflowId;
//                                                     govv.save(function(err) {
//                                                         if (!err) {
//                                                             console.log("saved by governmentIdNumber as notissuedto");
//                                                             res.end()
//                                                         } else {
//                                                             console.log(err)
//                                                             console.log("not saved by governmentIdNumber as not issuedto");
//                                                             res.end()
//                                                         }
//                                                     })
//                                                 }
//                                             }) //gov










//                                     } else {
//                                         paperflowId = name.paperflowId
//                                         data.student.push({ paperflowId })
//                                         data.save()
//                                         name.aadharCard = req.body.aadharCard;
//                                         name.student.push({ issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
//                                         name.save(function(err) {

//                                             if (!err) {
//                                                 res.json({ success: true, message: "Student found by name.student save" });
//                                                 res.end()
//                                             } else {
//                                                 res.json({ success: false, message: err });
//                                                 res.end()
//                                             }
//                                         })
//                                     }
//                                 })
//                             } else {
//                                 paperflowId = mail.paperflowId
//                                 data.student.push({ paperflowId })
//                                 data.save()
//                                 mail.aadharCard = req.body.aadharCard;
//                                 mail.student.push({issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus ,lastmodified})
//                                 mail.save(function(err) {

//                                     if (!err) {

//                                         res.json({ success: true, message: "Student found by alternate email.student save" });
//                                         res.end()
//                                     } else {
//                                         res.json({ success: false, message: err });
//                                         res.end()
//                                     }
//                                 })
//                             }
//                         })
//                     } else {
//                         paperflowId = pri.paperflowId
//                         data.student.push({ paperflowId })
//                         data.save()
//                         pri.aadharCard = req.body.aadharCard;
//                         pri.student.push({ issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
//                         pri.save(function(err) {

//                             if (!err) {
//                                 res.json({ success: true, message: "Student found by primary email.student save" });
//                                 res.end()
//                             } else {

//                                 res.json({ success: false, message: err });
//                                 res.end()
//                             }
//                         })

//                     }
//                 })
//             } else {
//                 paperflowId = gov.paperflowId
//                 data.student.push({ paperflowId })
//                 data.save()
//                 gov.aadharCard = req.body.aadharCard;
//                 gov.student.push({issuedDate, nameOfstudent, typeOfCourse, courseName, duration, version, certStatus,lastmodified })
//                 gov.save(function(err) {

//                     if (!err) {

//                         res.json({ success: true, message: "Student found by government id .student save" });
//                         res.end()
//                     } else {

//                         res.json({ success: false, message: err });
//                         res.end()
//                     }
//                 })


//             }
//         })
//     } //elseif

// }) //train_c


} //export



// exports.apost = function(req, res) {
//         console.log(req.body.aadharCard)
//         Student.findOne({ aadharCard: req.body.aadharCard }, function(err, student) {

//             console.log(req.body.aadharCard)
//             console.log(student)
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
//                                                                 ContactRegister.findOne({ $and: [{ firstName: req.body.  firstName }, { fatherName: req.body.fatherName }, { motherName: req.body.motherName }, { dateOfBirth: req.body.dateOfBirth }] }, function(err, namee) {
//                                                                         if (namee == null || namee == undefined || namee == '') {
//                                                                             console.log("person not found as subuser")
//                                                                         } else {
//                                                                             student.notissueby.paperflowId = namee.paperflowId;
//                                                                             student.save(function(err) {
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
//                                                                 student.notissueby.paperflowId = maill.paperflowId;
//                                                                 student.save(function(err) {
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
//                                                     student.notissueby.paperflowId = prii.paperflowId;
//                                                     student.save(function(err) {
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
//                                         student.notissueby.paperflowId = govv.paperflowId;
//                                         student.save(function(err) {
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
//                             student.notissueby.paperflowId = cardd.paperflowId;
//                             student.save(function(err) {
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
//                                                     ContactRegister.findOne({ $and: [{ firstName: req.body.  firstName }, { fatherName: req.body.fatherName }, { motherName: req.body.motherName }, { dateOfBirth: req.body.dateOfBirth }] }, function(err, namee) {
//                                                             if (namee == null || namee == undefined || namee == '') {
//                                                                 console.log("person not found as subuser")
//                                                             } else {
//                                                                 student.notissueby.paperflowId = namee.paperflowId;
//                                                                 student.save(function(err) {
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
//                                                     student.notissueby.paperflowId = maill.paperflowId;
//                                                     student.save(function(err) {
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
//                                         student.notissueby.paperflowId = prii.paperflowId;
//                                         student.save(function(err) {
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
//                             student.notissueby.paperflowId = govv.paperflowId;
//                             student.save(function(err) {
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
