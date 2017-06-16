var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var Training_com_Register = require('../../../models/training_company');
var Training_int_Register = require('../../../models/training_ins');
var ContactRegister = require('../../../models/contact');
var SchoolRegister = require('../../../models/school');
var Login = require('../../../models/login');
var Student = require('../../../models/student');
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


                  Login.findOne({ paperflowId:req.decoded.paperflowId }, function(err, su) {

                            if (su.typeOfOrganization==001 ||su.typeOfOrganization==003 || su.typeOfOrganization==004) 
                            {
                                var subuser = new ContactRegister()
                                subuser.typeOfOrganization = su.typeOfOrganization
                                subuser.nameOfOrganization = su.nameOfOrganization
                                subuser.firstName = req.body.firstName;
                                subuser.middleName = req.body.middleName;
                                subuser.lastName = req.body.lastName;
                                dob = req.body.dateOfBirth;
                                subuser.dateOfBirth.push({dob}) 
                                subuser.gender = req.body.gender;
                                subuser.nationality = req.body.nationality;
                                fatherFirstName = req.body.fatherFirstName;
                                fatherMiddleName = req.body.fatherMiddleName;
                                fatherLastName = req.body.fatherLastName;
                                fatherEmail = req.body.fatherEmail;
                                subuser.father.push({fatherFirstName,fatherMiddleName,fatherLastName,fatherEmail})
                                motherFirstName = req.body.motherFirstName;
                                motherMiddleName = req.body.motherMiddleName;
                                motherLastName = req.body.motherLastName;

                                motherEmail = req.body.motherEmail;
                                    
                                subuser.mother.push({motherFirstName,motherMiddleName,motherLastName,motherEmail})
                                subuser.maritalStatus = req.body.maritalStatus;
                                hsStatus = req.body.hsStatus;
                                hsFirstName = req.body.hsFirstName;
                                hsMiddleName= req.body.hsMiddleName;
                                hsLastName=req.body.hsLastName;
                                hsEmail = req.body.hsEmail;
                                subuser.typeHs.push({hsStatus,hsFirstName,hsMiddleName,hsLastName,hsEmail})
                                

                                primary = parseInt(req.body.primaryNumber);
                                secondary = parseInt(req.body.secondaryNumber);
                                other = parseInt(req.body.otherNumber);
                                lastmodified= new Date()
                                subuser.contactNumber.push({primary,secondary,other,lastmodified})

                                primary = req.body.primaryEmail;
                                alternate = req.body.alternateEmail;
                                lastmodified=new Date()
                                subuser.email.push({primary,alternate,lastmodified})

                                addressLine1 = req.body.permanentAddressLine1;
                                addressLine2 = req.body.permanentAddressLine2;
                                city = req.body.permanentCity;

                                district = req.body.permanentDistrict;
                                state = req.body.permanentState;
                                pinCode = parseInt(req.body.permanentPinCode);
                                country = req.body.permanentCountry;
                                subuser.permanentAddress.push({addressLine1,addressLine2,city,district,state,pinCode,country})

                                subuser.currentAddress.addressLine1 = req.body.currentAddressLine1;
                                subuser.currentAddress.addressLine2 = req.body.currentAddressLine2;
                                subuser.currentAddress.city = req.body.currentCity;
                                subuser.currentAddress.district = req.body.currentDistrict;

                                subuser.currentAddress.state = req.body.currentState;
                                subuser.currentAddress.pinCode = parseInt(req.body.currentPinCode);
                                subuser.currentAddress.country = req.body.currentCountry;
                                subuser.currentAddress.lastmodified=new Date()

                                addressLine1 = req.body.previousAddressLine1;
                                addressLine2 = req.body.previousAddressLine2;
                                city = req.body.previousCity;
                                district = req.body.previousDistrict;
                                state = req.body.previousState;
                                pinCode = parseInt(req.body.previousPinCode);
                                country = req.body.previousCountry;
                                lastmodified=new Date()
                                subuser.previousAddress.push({addressLine1,addressLine2,city,district,state,pinCode,country,lastmodified})



                               subuser.governmentIdName = req.body.governmentIdName;
                               subuser.governmentIdNumber = req.body.governmentIdNumber;
                               subuser.governmentType=req.body.governmentType;
                                
                                subuser.aadharCardNumber = req.body.aadharCardNumber;
                                subuser.authorityType = req.body.authorityType
                                subuser.subuserType = req.body.type
                                subuser.userStatus="True"

                                var randomNum = Math.floor((Math.random() * 10000000) + 1000000);
                                var newPassword = hashSalt.encode(randomNum);
                                console.log(newPassword)


                                var login = new Login;
                                login.typeOfOrganization = su.typeOfOrganization
                                login.nameOfOrganization = su.nameOfOrganization
                                login.organizationPaperflowId = req.body.organizationPaperflowId
                                email = req.body.primaryEmail
                                lastmodified=new Date()
                                login.email.push({email,lastmodified})
                                login.active = true;
                                password = newPassword;
                                login.password.push({password,lastmodified})
                                createdAt=new Date()
                                login.save()
                                console.log("------------------")


                                subuser.save(function(err) {
                                        console.log("----------vvvv--------")

                                        if (err) {
                                            //res.send(err)
                                            res.json({ success: false,message: 'Invaild data' });
                                            
                                        } else {

                                        console.log("subuser saved")

                                            // var message = {
                                            //     text: "",
                                            //     from: "PaperFlow <testuserdmt@gmail.com>",
                                            //     to: req.body.primaryEmail,
                                            //     subject: "PaperFlow Account Details",
                                            //     attachment: [{
                                            //         data: "<html>Hi,<br><h2>Thank you for registering with PaperFlow as a subuser on the behalf of </h2><br>" + su.nameOfOrganization +
                                            //             "These are you login details.<br>" +
                                            //             "Email: <strong> " + req.body.primaryEmail +
                                            //             "</strong>" +
                                            //             "Password: <strong> " + newPassword +
                                            //             "</strong></html>",
                                            //         alternative: true
                                            //     }]
                                            // };
                                            // mailSender.send(message, function(err, data) {
                                            //     console.log('sent')
                                            //         // res.json({ success: true });
                                            //         // res.end();
                                            // })

                                        }
                                    })
                                    //     }
                                    // })

                                            var message = {
                                                text: "",
                                                from: "PaperFlow <testuserdmt@gmail.com>",
                                                to: req.body.primaryEmail,
                                                subject: "PaperFlow Account Details",
                                                attachment: [{
                                                    data: "<html>Hi,<br><h2>Thank you for registering with PaperFlow as a subuser on the behalf of </h2><br>" + su.nameOfOrganization +
                                                        "These are you login details.<br>" +
                                                        "Email: <strong> " + req.body.primaryEmail +
                                                        "</strong>" +
                                                        "Password: <strong> " + newPassword +
                                                        "</strong></html>",
                                                    alternative: true
                                                }]
                                            };
                                            mailSender.send(message, function(err, data) {
                                                console.log('sent')
                                                    // res.json({ success: true });
                                                    
                                            })



                                var id1 = req.decoded.paperflowId;
                                console.log(id1)

                                Training_com_Register.aggregate([{ $match: { paperflowId: req.decoded.paperflowId } }, { "$project": { "subuser": { "$slice": ["$subuser", -1] } } }], function(err, data) {
                                        //Training_com_Register.aggregate([{ $match: { paperflowId: req.decoded.paperflowId } }, { "$project": { "subuser": { "$slice": ["$subuser ", -1] } } }]).exec(function(err, data) {
                                        console.log(data[0].subuser)
                                        console.log(data[0].subuser[0])
                                        //console.log(data[0].1ubuser[0])
                                           

                                        if (data[0].subuser[0] == null || data[0].subuser[0] == 'undefined') {

                                            if(su.typeOfOrganization== 001){
                                            Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { "subuser":req.decoded.paperflowId + 'SU' + '001' } }, function(err, data) {
                                                if (err) {
                                                    console.log(err)
                                                    console.log({ success: false, message: "not push" })

                                                } else {
                                                    console.log(data)
                                                }
                                            })
                                        }else if(su.typeOfOrganization==003){
                                            Training_int_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { "subuser":req.decoded.paperflowId + 'SU' + '001' } }, function(err, data) {
                                                if (err) {
                                                    console.log(err)
                                                    console.log({ success: false, message: "not push" })

                                                } else {
                                                    console.log(data)
                                                }
                                            })
                                        }else if(su.typeOfOrganization==004){
                                            SchoolRegister.update({ paperflowId: req.decoded.paperflowId }, { $push: { "subuser":req.decoded.paperflowId + 'SU' + '001' } }, function(err, data) {
                                                if (err) {
                                                    console.log(err)
                                                    console.log({ success: false, message: "not push" })

                                                } else {
                                                    console.log(data)
                                                }
                                            })
                                        }

                                            ContactRegister.update({ "email.primary": req.body.primaryEmail }, { $set: { paperflowId: req.decoded.paperflowId + 'SU' + '001' } }, function(err, data) {
                                                if (err) {
                                                    console.log({ success: false, message: "not push2" })

                                                } else {
                                                    console.log(err)
                                                    console.log(data)
                                                }
                                            })
                                            Login.update({ "email.email": req.body.primaryEmail }, { $set: { paperflowId: req.decoded.paperflowId + 'SU' + '001' } }, function(err, data) {
                                                if (err) {
                                                    console.log(err)
                                                    res.json({ success: false, message: "not push3" })

                                                } else {
                                                    console.log(data)
                                                    res.json({ success: true, message: "subuser created" })
                                                }
                                            })
                                        } else {

                                            v = data[0].subuser[0].paperflowId

                                            var values = v.slice(-3);
                                            yourNumber = parseInt(values, 16);
                                            console.log(yourNumber)

                                            var i = yourNumber + 1;
                                            n = i.toString(16)
                                            x = n.length;
                                            console.log(x)
                                            digit = 3 - x;
                                            if (digit == 3)
                                                id = '000' + n
                                            if (digit == 2)
                                                id = '00' + n
                                            if (digit == 1)
                                                id = '0' + n
                                            if (digit == 0)
                                                id = n
                                            console.log(id)

                                            if(su.typeOfOrganization== 001){
                                            Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { "subuser":req.decoded.paperflowId + 'SU' + id } }, function(err, data) {
                                                if (err) {
                                                    console.log(err)
                                                    console.log({ success: false, message: "not push" })

                                                } else {
                                                    console.log(data)
                                                }
                                            })
                                        }else if(su.typeOfOrganization==003){
                                            Training_int_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { "subuser":req.decoded.paperflowId + 'SU' + id } }, function(err, data) {
                                                if (err) {
                                                    console.log(err)
                                                    console.log({ success: false, message: "not push" })

                                                } else {
                                                    console.log(data)
                                                }
                                            })
                                        }else if(su.typeOfOrganization==004){
                                            SchoolRegister.update({ paperflowId: req.decoded.paperflowId }, { $push: { "subuser":req.decoded.paperflowId + 'SU' + id } }, function(err, data) {
                                                if (err) {
                                                    console.log(err)
                                                    console.log({ success: false, message: "not push" })

                                                } else {
                                                    console.log(data)
                                                }
                                            })
                                        }


                                            ContactRegister.update({ "email.primary": req.body.primaryEmail }, { $set: { paperflowId: req.decoded.paperflowId + 'SU' + id } }, function(err, data) {
                                                if (err) {
                                                    console.log(err)
                                                    console.log({ success: false, message: "not push2" })

                                                } else {
                                                    console.log(data)
                                                }
                                            })

                                            Login.update({ "email.email": req.body.primaryEmail }, { $set: { paperflowId: req.decoded.paperflowId + 'SU' + id } }, function(err, data) {
                                                if (err) {
                                                    console.log(err)
                                                    res.json({ success: false, message: "not push3" })

                                                } else {
                                                    console.log(data)
                                                    res.json({ success: true, message: "subuser created" })
                                                }
                                            })
                                        }
                                    }) //tr_com agg
                            }else{
                                res.status(403).send({ success: true, message: 'Forbidden' })
                            } //if
                        })
                    } //tr_com 

// if (req.body.aadharCardNumber.length != 0)

// {

//     Student.findOne({ "aadharCard.aadharCardNumber": req.body.aadharCardNumber }, function(err, card) {
//         //console.log(card)


//         if (card == null || card == undefined || card == "") {
//             Student.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, gov) {
//                 // console.log(gov.governmentIdNumber)
//                 if (gov == null || gov == undefined || gov == '') {
//                     Student.findOne({ "email.primary": req.body.primaryEmail }, function(err, pri) {
//                         //console.log(pri)
//                         //console.log(pri.primaryEmail)
//                         if (pri == null || pri == undefined || pri == '') {
//                             Student.findOne({ "email.alternate": req.body.alternateEmail }, function(err, mail) {
//                                 if (mail == null || mail == undefined || mail == '') {
//                                     Student.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName }, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, name) {
//                                         if (name == null || name == undefined || name == '') {


//                                                 console.log("Student not found.")
//                                             // res.json({ success: true, message: "Student not found." });
//                                             // res.end()



//                                         } else {
//                                             ContactRegister.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName}, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, dat) {

//                                                 dat.notissueto.paperflowId = name.paperflowId;


//                                                 dat.save(function(err) {

//                                                     if (!err) {
//                                                     console.log("Student found by name. Detail save in subuser account")
//                                                         // res.json({ success: true, message: "Student found by name. Detail save" });
//                                                         // res.end()
//                                                     } else {
//                                                     console.log("error1")
//                                                         // res.json({ success: false, message: err });
//                                                         // res.end()
//                                                     }
//                                                 })
//                                             })
//                                         }
//                                     })
//                                 } else {

//                                     ContactRegister.findOne({ "email.alternate": req.body.alternateEmail }, function(err, dat) {

//                                         dat.notissueto.paperflowId = mail.paperflowId;
                                        

//                                         dat.save(function(err) {

//                                             if (!err) {
//                                                 console.log("Student found by alter mail. Detail save in subuser account.")
//                                                 // res.json({ success: true, message: "Student found by alternate email. Details save" });
//                                                 // res.end()
//                                             } else {
//                                                 console.log("error2")
//                                                 // res.json({ success: false, message: err });
//                                                 // res.end()
//                                             }
//                                         })
//                                     })
//                                 }
//                             })
//                         } else {
//                             ContactRegister.findOne({ "email.primary": req.body.primaryEmail }, function(err, dat) {
//                                 console.log(data.paperflowId)
//                                 dat.notissueto.paperflowId = pri.paperflowId;
//                                 console.log(dat.notissueto.paperflowId )
                                

//                                 dat.save(function(err) {

//                                     if (!err) {
//                                         console.log("Student found by primary mail. Detail save in subuser account.")
//                                         // res.json({ success: true, message: "Student found by primary email.Certificate save" });
//                                         // res.end()
//                                     } else {
//                                         console.log("error3")
//                                         // res.json({ success: false, message: err });
//                                         // res.end()
//                                     }
//                                 })
//                             })

//                         }
//                     })
//                 } else {
//                     ContactRegister.findOne({ governmentIdNumber: req.body.governmentIdNumber }, function(err, dat) {
//                         console.log(data)
//                         dat.notissueto.paperflowId = gov.paperflowId;
//                         console.log(dat.notissueto.paperflowId)
                                
//                         dat.save(function(err) {

//                             if (!err) {
//                                 console.log("Student found by government id. Detail save in subuser account.")
//                                 // res.json({ success: true, message: "Student found by government id .Certificate save" });
//                                 // res.end()
//                             } else {
//                                 console.log("error4")
//                                 // res.json({ success: false, message: err });
//                                 // res.end()
//                             }
//                         })
//                     })


//                 }
//             })
//         } else {
//            ContactRegister.findOne({ aadharCardNumber: req.body.aadharCardNumber }, function(err, dat) {
//                     console.log(dat)
//                 dat.notissueto.paperflowId = card.paperflowId;
                
//                 dat.save(function(err) {

//                     if (!err) {
//                         console.log("Student found byaadhar card. Detail save in subuser account.")
//                         // res.json({ success: true, message: "Student found by aadhar card.Certificate save" });
//                         // res.end()
//                     } else {
//                         console.log("error5")
//                         // res.json({ success: false, message: err });
//                         // res.end()
//                     }
//                 })
//             })
//         } //else
//     })
// } else if (req.body.aadharCardNumber.length == 0) {

//     Student.findOne({ "governmentIdDetail.governmentIdNumber": req.body.governmentIdNumber }, function(err, gov) {

//             if (gov == null || gov == undefined || gov == '') {
//                 Student.findOne({ "email.primary": req.body.primaryEmail }, function(err, pri) {

//                         if (pri == null || pri == undefined || pri == '') {
//                             Student.findOne({ "email.alternate": req.body.alternateEmail }, function(err, mail) {
//                                     if (mail == null || mail == undefined || mail == '') {
//                                        Student.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName }, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, name) {
//                                                 if (name == null || name == undefined || name == '') {
//                                                         console.log("Student not found." )
//                                                     // res.json({ success: true, message: "Student not found." });
//                                                     // res.end()
                                                


//                                             } else {
//                                                 ContactRegister.findOne({ $and: [{ firstName: req.body.firstName }, { "father.fatherFirstName": req.body.fatherFirstName }, { "mother.motherFirstName": req.body.motherFirstName}, { "dateOfBirth.dob": req.body.dateOfBirth }] }, function(err, dat) {
//                                                     dat.notissueto.paperflowId = name.paperflowId;
//                                                     dat.save(function(err) {

//                                                         if (!err) {
//                                                             console.log("Student found by name.Details save in subuser account" )

//                                                             // res.json({ success: true, message: "Student found by name.Certificate save" });
//                                                             // res.end()
//                                                         } else {
//                                                             console.log("error6")
//                                                             // res.json({ success: false, message: err });
//                                                             // res.end()
//                                                         }
//                                                     })
//                                                 })
//                                             }
//                                         })
//                                 } else {
//                                     ContactRegister.findOne({ "email.alternate": req.body.alternateEmail }, function(err, dat) {
//                                         dat.notissueto.paperflowId = mail.paperflowId;
//                                         dat.save(function(err) {

//                                             if (!err) {
//                                                 console.log("Student found by alternateEmail. Detail save in subuser account.")
//                                                 // res.json({ success: true, message: "Student found by alternate email.Certificate save" });
//                                                 // res.end()
//                                             } else {
//                                                 console.log("error7")
//                                                 // res.json({ success: false, message: err });
//                                                 // res.end()
//                                             }
//                                         })
//                                     })

//                                 }
//                             })
//                     } else {
//                         ContactRegister.findOne({ "email.primary": req.body.primaryEmail }, function(err, dat) {

//                             dat.notissueto.paperflowId = pri.paperflowId;
//                             dat.save(function(err) {

//                                 if (!err) {
//                                     console.log("Student found by primary email. Detail save in subuser account.")
//                                     // res.json({ success: true, message: "Student found by primary email.Certificate save" });
//                                     // res.end()
//                                 } else {
//                                     console.log("error8")
//                                     // res.json({ success: false, message: err });
//                                     // res.end()
//                                 }
//                             })
//                         })

//                     }
//                 })
//         } else {
//             ContactRegister.findOne({ governmentIdNumber: req.body.governmentIdNumber }, function(err, dat) {

//                 dat.notissueto.paperflowId = gov.paperflowId;
//                 dat.save(function(err) {

//                     if (!err) {
//                         console.log("Student found by governmentIdNumber. Detail save in subuser account.")

//                         // res.json({ success: true, message: "Student found by government id .Certificate save" });
//                         // res.end()
//                     } else {
//                         console.log("error9")
//                         // res.json({ success: false, message: err });
//                         // res.end()
//                     }
//                 })
//             })
//         }
//     }) //else
// } //else

//}



// exports.subuser = function(req, res) {
//     token = req.headers.token;
//     if (token) {
//         jwt.verify(token, 'superSecret', function(err, req.decoded) {


//             if (err) {
//                 return res.status(401).send({ status: 401, message: 'Failed to authenticate token.' });

//             } else {

//                 var id1 = req.decoded.paperflowId;
//                 console.log(id1)

// Training_com_Register.aggregate([{$match:{paperflowId: req.decoded.paperflowId}}, { "$project": { "subuser": { "$slice": [ "$subuser", -1 ] } } } ],function(err,data){

//                     console.log(data)
//                     console.log(data[0].subuser[0])


//                     if (data[0].subuser[0] == null || data[0].subuser[0] == 'undefined') {


//                         Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { "subuser": req.decoded.paperflowId + '/' + '001' } },function(err, data) {
//                             if (err) {
//                                   console.log(err)
//                                 console.log({ success: false, message: "not push" })

//                             } else {
//                                 console.log(data)
//                             }
//                         })


//                         ContactRegister.update({ "email.primary": req.body.primaryEmail }, { $set: { paperflowId: req.decoded.paperflowId + '/' + '001' } },function(err, data) {
//                             if (err) {
//                                 console.log({ success: false, message: "not push2" })

//                             } else {
//                                 console.log(err)
//                                 console.log(data)
//                             }
//                         })
//                         Login.update({ email: req.body.primaryEmail }, { $set: { paperflowId: req.decoded.paperflowId + '/' + '001' } },function(err, data) {
//                             if (err) {
//                                 console.log(err)
//                                 res.json({ success: false, message: "not push3" })

//                             } else {
//                                 res.json(data)
//                             }
//                         })
//                     } 
//                     else {

//                         console.log(data[0].subuser[0])


//                         v = data[0].subuser[0]
//                         console.log(v)

//                         var values = v.split('/');


//                         var street = values[4];
//                         console.log(street)

//                         yourNumber = parseInt(street, 16);
//                         console.log(yourNumber)

//                         var i = yourNumber + 1;
//                         n = i.toString(16)
//                         x = n.length;
//                         console.log(x)
//                         digit = 3 - x;
//                         if (digit == 3)
//                             id = '000' + n
//                         if (digit == 2)
//                             id = '00' + n
//                         if (digit == 1)
//                             id = '0' + n
//                         if (digit == 0)
//                             id = n
//                         console.log(id)

//                         Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { "subuser": req.decoded.paperflowId + '/' + id } },function(err, data) {
//                             if (err) {
//                                 console.log({ success: false, message: "not push" })
//                                 console.log(err)

//                             } else {
//                                 console.log(data)
//                             }
//                         })


//                         ContactRegister.update({ "email.primary": req.body.primaryEmail }, { $set: { paperflowId: req.decoded.paperflowId + '/' + id } },function(err, data) {
//                             if (err) {
//                                   console.log(err)
//                                 console.log({ success: false, message: "not push2" })

//                             } else {
//                                 console.log(data)
//                             }
//                         })

//                         Login.update({ email: req.body.primaryEmail }, { $set: { paperflowId: req.decoded.paperflowId + '/' + id } },function(err, data) {
//                             if (err) {
//                                   console.log(err)
//                                 res.json({ success: false, message: "not push3" })

//                             } else {
//                                 res.json(data)
//                             }
//                         })


//                     }

//                 })
//                 }//else
//             })
//         }
//     }
