var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var SchoolRegister = require('../../../models/school');
var ContactRegister = require('../../../models/contact');
var Login = require('../../../models/login');
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
    token = req.headers.token;
    if (token) {
        jwt.verify(token, 'superSecret', function(err, decoded) {


            if (err) {
                return res.status(401).send({ status: 401, message: 'Failed to authenticate token.' });

            } else {


                SchoolRegister.findOne({ paperflowId: decoded.paperflowId }, function(err, su) {
                    if (!err) {
                        var subuser = new ContactRegister()
                        subuser.typeOfOrganization = su.typeOfOrganization
                        subuser.nameOfOrganization = su.nameOfOrganization
                        subuser.	firstName = req.body.first_name;
                        subuser.lastName = req.body.last_name;

                        subuser.dateOfBirth = req.body.date_of_birth;
                        subuser.gender = req.body.gender;
                        subuser.nationality = req.body.nationality;
                        subuser.fatherName = req.body.father_name;
                        subuser.fatherEmail = req.body.fatherEmail;
                        subuser.motherName = req.body.motherName;
                        subuser.motherEmail = req.body.motherEmail;
                        subuser.maritalStatus = req.body.maritalStatus;
                        subuser.typeHs.hsStatus = req.body.hsStatus;
                        subuser.typeHs.name = req.body.type_name;
                        subuser.typeHs.email = req.body.type_email;
                        subuser.contactNumber.primary = req.body.primary_no;
                        subuser.contactNumber.secondary = req.body.secondary_no;
                        subuser.contactNumber.other = req.body.other_no;
                        subuser.email.primary = req.body.primary_email;
                        subuser.email.alternate = req.body.alternate_email;
                        subuser.permanentAddress.address1 = req.body.permanentAddress1;
                        subuser.permanentAddress.addressLine2 = req.body.permanentAddressLine2;
                        subuser.permanentAddress.city = req.body.permanent_city;

                        subuser.permanentAddress.district = req.body.permanent_district;
                        subuser.permanentAddress.state = req.body.permanent_state;
                        subuser.permanentAddress.pinCode = req.body.permanent_pinCode;
                        subuser.permanentAddress.country = req.body.permanent_country;
                        subuser.currentAddress.address1 = req.body.currentAddress1;
                        subuser.currentAddress.addressLine2 = req.body.currentAddressLine2;
                        subuser.currentAddress.city = req.body.current_city;
                        subuser.currentAddress.district = req.body.current_district;

                        subuser.currentAddress.state = req.body.current_state;
                        subuser.currentAddress.pinCode = req.body.current_pinCode;
                        subuser.currentAddress.country = req.body.current_country;
                        subuser.previousAddress.address1 = req.body.previousAddress1;
                        subuser.previousAddress.addressLine2 = req.body.previousAddressLine2;
                        subuser.previousAddress.city = req.body.previous_city;
                        subuser.previousAddress.district = req.body.previous_district;
                        subuser.previousAddress.state = req.body.previous_state;
                        subuser.previousAddress.pinCode = req.body.previous_pinCode;
                        subuser.previousAddress.country = req.body.previous_country;


                        subuser.governmentIdDetail.government_id_name = req.body.government_id_name;
                        subuser.governmentIdDetail.governmentIdNumber = req.body.government_id;
                        subuser.aadhar_card = req.body.aadhar_card;
                        subuser.authority_type = req.body.authority_type
                        subuser.type = req.body.type


                        var randomNum = Math.floor((Math.random() * 10000000) + 1000000);
                        var newPassword = hashSalt.encode(randomNum);
                        console.log(newPassword)


                        var login = new Login;
                        login.typeOfOrganization = 1
                        login.email = req.body.primary_email
                        login.active = true;
                        login.password = newPassword;
                        login.save()
                        console.log("------------------")


                        subuser.save(function(err) {
                                console.log("----------vvvv--------")

                                if (err) {
                                    //res.send(err)
                                    res.json({ success: false });
                                    res.end()
                                } else {
                                    console.log("subuser saved")



                                    // var message = {
                                    //     text: "",
                                    //     from: "PaperFlow <testuserdmt@gmail.com>",
                                    //     to: req.body.primary_email,
                                    //     subject: "PaperFlow Account Details",
                                    //     attachment: [{
                                    //         data: "<html>Hi,<br><h2>Thank you for registering with PaperFlow as a subuser on the behalf of </h2><br>" + su.nameOfOrganization +
                                    //             "These are you login details.<br>" +
                                    //             "Email: <strong> " + req.body.primary_email +
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
                                                to: req.body.primary_email,
                                                subject: "PaperFlow Account Details",
                                                attachment: [{
                                                    data: "<html>Hi,<br><h2>Thank you for registering with PaperFlow as a subuser on the behalf of </h2><br>" + su.nameOfOrganization +
                                                        "These are you login details.<br>" +
                                                        "Email: <strong> " + req.body.primary_email +
                                                        "</strong>" +
                                                        "Password: <strong> " + newPassword +
                                                        "</strong></html>",
                                                    alternative: true
                                                }]
                                            };
                                            mailSender.send(message, function(err, data) {
                                                console.log('sent')
                                                    // res.json({ success: true });
                                                    res.end();
                                            })



                        var id1 = decoded.paperflowId;
                        console.log(id1)

                        SchoolRegister.aggregate([{ $match: { paperflowId: decoded.paperflowId } }, { "$project": { "subuser": { "$slice": ["$subuser", -1] } } }], function(err, data) {
                            //Training_com_Register.aggregate([{ $match: { paperflowId: decoded.paperflowId } }, { "$project": { "subuser": { "$slice": ["$subuser ", -1] } } }]).exec(function(err, data) {
                            console.log(data)
                            console.log(data[0].subuser[0])
                                //Training_com_Register.findOne({ paperflowId: decoded.paperflowId }, { paperflowId: 1, _id: 0 }).sort({ paperflowId: -1 }).limit(1).exec(function(err, data) {

                            if (data[0].subuser[0] == null || data[0].subuser[0] == 'undefined') {

                                // Training_com_Register.update({$and:[{"paperflowId" : decoded.paperflowId},{"subuser.paperflowId":req.body.courseName}]},{$set:{"course.$.status":req.body.status}},function(err,data){
                                SchoolRegister.update({ paperflowId: decoded.paperflowId }, { $push: { "subuser": decoded.paperflowId + '/' + '001' } }, function(err, data) {
                                    if (err) {
                                        console.log(err)
                                        console.log({ success: false, message: "not push" })

                                    } else {
                                        console.log(data)
                                    }
                                })


                                ContactRegister.update({ "email.primary": req.body.primary_email }, { $set: { paperflowId: decoded.paperflowId + '/' + '001' } }, function(err, data) {
                                    if (err) {
                                        console.log({ success: false, message: "not push2" })

                                    } else {
                                        console.log(err)
                                        console.log(data)
                                    }
                                })
                                Login.update({ email: req.body.primary_email }, { $set: { paperflowId: decoded.paperflowId + '/' + '001' } }, function(err, data) {
                                    if (err) {
                                        console.log(err)
                                        res.json({ success: false, message: "not push3" })

                                    } else {
                                        console.log(data)
                                        res.json({ success: true, message: "subuser created" })
                                    }
                                })
                            } else {

                                //console.log(data[0].subuser[0])


                                v = data[0].subuser[0]
                                console.log(v)

                                var values = v.split('/');


                                var street = values[4];
                                console.log(street)

                                yourNumber = parseInt(street, 16);
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

                                SchoolRegister.update({ paperflowId: decoded.paperflowId }, { $push: { "subuser": decoded.paperflowId + '/' + id } }, function(err, data) {
                                    if (err) {
                                        console.log({ success: false, message: "not push" })
                                        console.log(err)

                                    } else {
                                        console.log(data)
                                    }
                                })


                                ContactRegister.update({ "email.primary": req.body.primary_email }, { $set: { paperflowId: decoded.paperflowId + '/' + id } }, function(err, data) {
                                    if (err) {
                                        console.log(err)
                                        console.log({ success: false, message: "not push2" })

                                    } else {
                                        console.log(data)
                                    }
                                })

                                Login.update({ email: req.body.primary_email }, { $set: { paperflowId: decoded.paperflowId + '/' + id } }, function(err, data) {
                                    if (err) {
                                        console.log(err)
                                        res.json({ success: false, message: "not push3" })

                                    } else {
                                        console.log(data)
                                        res.json({ success: true, message: "subuser created" })
                                    }
                                })


                            }

                        })

                    }
                })

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
                                    Student.findOne({ $and: [{ first_name: req.body.	firstName }, { father_name: req.body.fatherName }, { motherName: req.body.motherName }, { date_of_birth: req.body.dateOfBirth }] }, function(err, name) {
                                        if (name == null || name == undefined || name == '') {


                                                console.log("Student not found.")
                                            // res.json({ success: true, message: "Student not found." });
                                            // res.end()



                                        } else {
                                            ContactRegister.findOne({ $and: [{ first_name: req.body.	firstName }, { father_name: req.body.fatherName }, { motherName: req.body.motherName }, { date_of_birth: req.body.dateOfBirth }] }, function(err, data) {

                                                name.notissueby.paperflowId = data.paperflowId;


                                                name.save(function(err) {

                                                    if (!err) {
                                                    console.log("Student found by name. Detail save.")
                                                        // res.json({ success: true, message: "Student found by name. Detail save" });
                                                        // res.end()
                                                    } else {
                                                    console.log("error1")
                                                        // res.json({ success: false, message: err });
                                                        // res.end()
                                                    }
                                                })
                                            })
                                        }
                                    })
                                } else {

                                    ContactRegister.findOne({ "email.alternate": req.body.alternate_email }, function(err, data) {

                                        mail.notissueby.paperflowId = data.paperflowId;
                                        

                                        mail.save(function(err) {

                                            if (!err) {
                                                console.log("Student found by alter mail. Detail save.")
                                                // res.json({ success: true, message: "Student found by alternate email. Details save" });
                                                // res.end()
                                            } else {
                                                console.log("error2")
                                                // res.json({ success: false, message: err });
                                                // res.end()
                                            }
                                        })
                                    })
                                }
                            })
                        } else {
                            ContactRegister.findOne({ "email.primary": req.body.primary_email }, function(err, data) {
                                console.log(data.paperflowId)
                                pri.notissueby.paperflowId = data.paperflowId;
                                console.log(pri.notissueby.paperflowId)
                                

                                pri.save(function(err) {

                                    if (!err) {
                                        console.log("Student found by primary mail. Detail save.")
                                        // res.json({ success: true, message: "Student found by primary email.Certificate save" });
                                        // res.end()
                                    } else {
                                        console.log("error3")
                                        // res.json({ success: false, message: err });
                                        // res.end()
                                    }
                                })
                            })

                        }
                    })
                } else {
                    ContactRegister.findOne({ "governmentIdDetail.government_id": req.body.governmentIdNumber }, function(err, data) {
                        console.log(data)
                        gov.notissueby.paperflowId = data.paperflowId;
                        console.log(gov.notissueby.paperflowId)
                                
                        gov.save(function(err) {

                            if (!err) {
                                console.log("Student found by government id. Detail save.")
                                // res.json({ success: true, message: "Student found by government id .Certificate save" });
                                // res.end()
                            } else {
                                console.log("error4")
                                // res.json({ success: false, message: err });
                                // res.end()
                            }
                        })
                    })


                }
            })
        } else {
           ContactRegister.findOne({ aadhar_card: req.body.aadhar_card }, function(err, data) {

                card.notissueby.paperflowId = data.paperflowId;
                
                card.save(function(err) {

                    if (!err) {
                        console.log("Student found byaadhar card. Detail save.")
                        // res.json({ success: true, message: "Student found by aadhar card.Certificate save" });
                        // res.end()
                    } else {
                        console.log("error5")
                        // res.json({ success: false, message: err });
                        // res.end()
                    }
                })
            })
        } //else
    })
} else if (req.body.aadhar_card.length == 0) {

    Student.findOne({ "governmentIdDetail.government_id": req.body.governmentIdNumber }, function(err, gov) {

            if (gov == null || gov == undefined || gov == '') {
                Student.findOne({ "email.primary": req.body.primary_email }, function(err, pri) {

                        if (pri == null || pri == undefined || pri == '') {
                            Student.findOne({ "email.alternate": req.body.alternate_email }, function(err, mail) {
                                    if (mail == null || mail == undefined || mail == '') {
                                        Student.findOne({ $and: [{ first_name: req.body.	firstName }, { father_name: req.body.fatherName }, { motherName: req.body.motherName }, { date_of_birth: req.body.dateOfBirth }] }, function(err, name) {
                                                if (name == null || name == undefined || name == '') {
                                                        console.log("Student not found." )
                                                    // res.json({ success: true, message: "Student not found." });
                                                    // res.end()
                                                


                                            } else {
                                                ContactRegister.findOne({ $and: [{ first_name: req.body.	firstName }, { father_name: req.body.fatherName }, { motherName: req.body.motherName }, { date_of_birth: req.body.dateOfBirth }] }, function(err, data) {
                                                    name.notissueby.paperflowId = data.paperflowId;
                                                    name.save(function(err) {

                                                        if (!err) {
                                                            console.log("Student found by name.Details save" )

                                                            // res.json({ success: true, message: "Student found by name.Certificate save" });
                                                            // res.end()
                                                        } else {
                                                            console.log("error6")
                                                            // res.json({ success: false, message: err });
                                                            // res.end()
                                                        }
                                                    })
                                                })
                                            }
                                        })
                                } else {
                                    ContactRegister.findOne({ "email.alternate": req.body.alternate_email }, function(err, data) {
                                        mail.notissueby.paperflowId = data.paperflowId;
                                        mail.save(function(err) {

                                            if (!err) {
                                                console.log("Student found by alternate_email. Detail save.")
                                                // res.json({ success: true, message: "Student found by alternate email.Certificate save" });
                                                // res.end()
                                            } else {
                                                console.log("error7")
                                                // res.json({ success: false, message: err });
                                                // res.end()
                                            }
                                        })
                                    })

                                }
                            })
                    } else {
                        ContactRegister.findOne({ "email.primary": req.body.primary_email }, function(err, data) {

                            pri.notissueby.paperflowId = data.paperflowId;
                            pri.save(function(err) {

                                if (!err) {
                                    console.log("Student found by primary email. Detail save.")
                                    // res.json({ success: true, message: "Student found by primary email.Certificate save" });
                                    // res.end()
                                } else {
                                    console.log("error8")
                                    // res.json({ success: false, message: err });
                                    // res.end()
                                }
                            })
                        })

                    }
                })
        } else {
            ContactRegister.findOne({ "governmentIdDetail.government_id": req.body.governmentIdNumber }, function(err, data) {

                gov.notissueby.paperflowId = data.paperflowId;
                gov.save(function(err) {

                    if (!err) {
                        console.log("Student found by government_id. Detail save.")

                        // res.json({ success: true, message: "Student found by government id .Certificate save" });
                        // res.end()
                    } else {
                        console.log("error9")
                        // res.json({ success: false, message: err });
                        // res.end()
                    }
                })
            })
        }
    }) //else
} //else





            } //else
        });
    }
}
