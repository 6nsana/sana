var express = require("express");
var multer = require('multer');
var router = express.Router();
var mongoose = require('mongoose');
var Login = require('../../models/login');
var Training_com_Register = require('../../models/training_company');
var ContactRegister = require('../../models/contact');
var Training_int_Register = require('../../models/training_ins');
var SchoolRegister = require('../../models/school');

var folder;
// v = req.decoded.paperflowId
//             console.log(v)

//             var values = v.split('/');


//             var street = values[0];
//             console.log(street)





var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads/'+folder);
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});
var upload = multer({ storage: storage }).single('userPhoto');

exports.pic = function(req, res) {
    v = req.decoded.paperflowId
            console.log(v)

            var values = v.split('/');


            var street = values[0];
            console.log(street)
 folder = values[0]+'_'+values[1]+'_'+values[2]+'_'+values[3]
 console.log(folder)

    upload(req, res, function(err) {
        console.log(req.file);
        console.log(req.file.originalname);
        console.log(req.file.path);
        ext = req.file.originalname.split('.')
        console.log(ext[1])

        //console.log(req.files[1].originalname);
        if (err) {
            return res.end("Error uploading file.");
        } else {

 //            v = req.decoded.paperflowId
 //            console.log(v)

 //            var values = v.split('/');


 //            var street = values[0];
 //            console.log(street)
 // folder = values[0]+'_'+values[1]+'_'+values[2]+'_'+values[3]
 // console.log(folder)

 Login.findOne({ "paperflowId": req.decoded.paperflowId }, function(err, logindata) {
    console.log(logindata.typeOfOrganization)

            var today = new Date()
            //if (street == 'TC') {
               if (logindata.typeOfOrganization == '001') { 
             
             //var today=new Date()

                if (req.body.name == "license") {

                    Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { license: { licensePath: req.file.path, checkedByAdmin: "No", licenseCreatedAt: today, licenseStatus: "false" } } }, function(err, data) {
                        if (!err) {
                                   Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })
                            res.json({ success: true, message: "File is uploaded" })
                            res.end()
                        } else {
                     

                            res.json({ success: false, message: "Error uploading file." })
                            res.end()
                        }
                    })
                }
                if (req.body.name == 'cin') {


                    Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { cin: { cinPath: req.file.path, checkedByAdmin: "No", cinCreatedAt: today, cinStatus: "false" } } }, function(err, data) {
                        if (!err) {
                             Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })

                            res.json({ success: true, message: "File is uploaded" })
                            res.end()
                        } else {
                           
                            res.json({ success: false, message: "Error uploading file." })
                            res.end()
                        }
                    })
                }

                if (req.body.name == 'pan') {

                    Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { pan: { panPath: req.file.path, checkedByAdmin: "No", panCreatedAt: today, panStatus: "false" } } }, function(err, data) {
                        if (!err) {
                             Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })
                            res.json({ success: true, message: "File is uploaded" })
                            res.end()
                        } else {
                            
                            res.json({ success: false, message: "Error uploading file." })
                            res.end()
                        }
                    })
                }

                if (req.body.name == 'serviceTax') {

                    Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { serviceTax: { serviceTaxPath: req.file.path, checkedByAdmin: "No", serviceTaxCreatedAt: today, serviceTaxStatus: "false" } } }, function(err, data) {
                        if (!err) {
                             Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })

                            res.json({ success: true, message: "File is uploaded" })
                            res.end()
                        } else {
                           
                            res.json({ success: false, message: "Error uploading file." })
                            res.end()
                        }
                    })
                }

                if (req.body.name == 'governmentId') {

                    ContactRegister.update({ "organizationPaperflowId": req.decoded.paperflowId }, { $push: { governmentIdDetail: { governmentIdPath: req.file.path, checkedByAdmin: "No", createdAt: today, governmentIdStatus: "false" } } }, function(err, data) {
                        if (!err) {
                             Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })
                            res.json({ success: true, message: "File is uploaded" })
                            res.end()
                        } else {
                           

                            res.json({ success: false, message: "Error uploading file." })
                            res.end()
                        }
                    })
                }
                if (req.body.name == 'aadharCard') {

                    ContactRegister.update({ "organizationPaperflowId": req.decoded.paperflowId }, { $push: { aadharCard: { aadharCardPath: req.file.path, checkedByAdmin: "No", createdAt: today, aadharCardStatus: "false" } } }, function(err, data) {
                        if (!err) {
                             Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })

                            res.json({ success: true, message: "File is uploaded" })
                            res.end()
                        } else {
                           
                            res.json({ success: false, message: "Error uploading file." })
                            res.end()
                        }
                    })
                } }
                //else if (street == "TI") {
                    else if (logindata.typeOfOrganization == '002') {

                    if (req.body.name == "license") {
                        Training_int_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { license: { licensePath: req.file.path, checkedByAdmin: "No", licenseCreatedAt: today, licenseStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                

                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })
                    }

                    if (req.body.name == 'pan') {

                        Training_int_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { pan: { panPath: req.file.path, checkedByAdmin: "No", panCreatedAt: today, panStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                

                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })

                    }
                    if (req.body.name == 'serviceTax') {

                        Training_int_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { serviceTax: { serviceTaxPath: req.file.path, checkedByAdmin: "No", serviceTaxCreatedAt: today, serviceTaxStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })

                    }
                    if (req.body.name == 'governmentId') {

                        ContactRegister.update({ "organizationPaperflowId": req.decoded.paperflowId }, { $push: { governmentIdDetail: { governmentIdPath: req.file.path, checkedByAdmin: "No", createdAt: today, governmentIdStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })


                    }
                    if (req.body.name == 'aadharCard') {

                        ContactRegister.update({ "organizationPaperflowId": req.decoded.paperflowId }, { $push: { aadharCard: { aadharCardPath: req.file.path, checkedByAdmin: "No", createdAt: today, aadharCardStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })
                    }
                } 
                //else if (street == "ITI") {
                    else if (logindata.typeOfOrganization == '003') {

                    if (req.body.name == "license") {

                        Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { license: { licensePath: req.file.path, checkedByAdmin: "No", licenseCreatedAt: today, licenseStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                Login.update({ paperflowId:req.decoded.paperflowId},{$set:{lastmodified:new Date()}}, function(err, daa) {
                                                console.log(daa)
                                            })
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })

                    }
                    if (req.body.name == 'cin') {

                        Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { cin: { cinPath: req.file.path, checkedByAdmin: "No", cinCreatedAt: today, cinStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })

                    }
                    if (req.body.name == 'pan') {

                        Training_com_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { pan: { panPath: req.file.path, checkedByAdmin: "No", panCreatedAt: today, panStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })

                    }
                    if (req.body.name == 'serviceTax') {

                        Training_int_Register.update({ paperflowId: req.decoded.paperflowId }, { $push: { serviceTax: { serviceTaxPath: req.file.path, checkedByAdmin: "No", serviceTaxCreatedAt: today, serviceTaxStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })


                    }
                    if (req.body.name == 'governmentId') {

                        ContactRegister.update({ "organizationPaperflowId": req.decoded.paperflowId }, { $push: { governmentIdDetail: { governmentIdPath: req.file.path, checkedByAdmin: "No", createdAt: today, governmentIdStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })
                    }
                    if (req.body.name == 'aadharCard') {


                        ContactRegister.update({ "organizationPaperflowId": req.decoded.paperflowId }, { $push: { governmentIdDetail: { governmentIdPath: req.file.path, checkedByAdmin: "No", createdAt: today, governmentIdStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })

                    }
                }
                // else if (street == "SC") {
                    else if (logindata.typeOfOrganization == '004') {
                    if (req.body.name == 'governmentId') {


                        ContactRegister.update({ "organizationPaperflowId": req.decoded.paperflowId }, { $push: { governmentIdDetail: { governmentIdPath: req.file.path, checkedByAdmin: "No", createdAt: today, governmentIdStatus: "false" } } }, function(err, data) {
                            if (!err) {
                                res.json({ success: true, message: "File is uploaded" })
                                res.end()
                            } else {
                                res.json({ success: false, message: "Error uploading file." })
                                res.end()
                            }
                        })
                    }
                

                if (req.body.name == 'aadharCard') {

                    ContactRegister.update({ "organizationPaperflowId": req.decoded.paperflowId }, { $push: { governmentIdDetail: { governmentIdPath: req.file.path, checkedByAdmin: "No", createdAt: today, governmentIdStatus: "false" } } }, function(err, data) {
                        if (!err) {
                            res.json({ success: true, message: "File is uploaded" })
                            res.end()
                        } else {
                            res.json({ success: false, message: "Error uploading file." })
                            res.end()
                        }
                    })

                }
            } else {
                console.log('nothing')
            }
        })
        }

    })
}
