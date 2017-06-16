var express = require("express");
var multer = require('multer');
var router = express.Router();
var mongoose = require('mongoose');
var Training_com_Register = require('../../models/training_company');
var ContactRegister = require('../../models/contact');
var Training_int_Register = require('../../models/training_ins');
var SchoolRegister = require('../../models/school');


var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});
var upload = multer({ storage: storage }).single('userPhoto');

exports.pic = function(req, res) {

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

                v = req.decoded.paperflowId
                console.log(v)

                var values = v.split('/');


                var street = values[0];
                console.log(street)



                var todate = new Date()
                if (street == 'TC') {


                    if (req.body.name == "license") {
                        Training_com_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {

                            licensePath = req.file.path
                            checkedByAdmin = "No"
                            licenseStatus = "false"
                            licenseCreatedAt = todate
                            d.license.push({ licensePath, checkedByAdmin, licenseCreatedAt, licenseStatus })
                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })
                    }
                    if (req.body.name == 'cin') {
                        Training_com_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {
                            cinPath = req.file.path
                            checkedByAdmin = "No"
                            cinCreatedAt = todate
                            cinStatus = "false"
                            d.cin.push({ cinPath, checkedByAdmin, cinCreatedAt, cinStatus })
                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })

                    }
                    if (req.body.name == 'pan') {
                        Training_com_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {
                            panPath = req.file.path
                            checkedByAdmin = "No"
                            panCreatedAt = todate
                            panStatus = "false"
                            d.pan.push({ panPath, checkedByAdmin, panCreatedAt, panStatus })
                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })
                    }
                    if (req.body.name == 'serviceTax') {
                        Training_com_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {
                            serviceTaxPath = req.file.path
                            serviceTaxCreatedAt = todate
                            serviceTaxStatus = "false"
                            checkedByAdmin = "No"
							d.serviceTax.push({serviceTaxPath,serviceTaxCreatedAt,serviceTaxStatus,checkedByAdmin})

                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })
                    }
                    if (req.body.name == 'governmentId') {

                        ContactRegister.findOne({ "organizationPaperflowId": req.decoded.paperflowId }, function(err, contact) {

                            governmentIdPath = req.file.path
                            createdAt = todate
                            governmentIdStatus = "false"
                            checkedByAdmin = "No"
                            contact.governmentIdDetail.push({ governmentIdPath, createdAt, governmentIdStatus, checkedByAdmin })
                            contact.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } //res.send(err);
                                else {

                                    res.end("File is uploaded");


                                }
                            })
                        })
                    }
                    if (req.body.name == 'aadharCard') {

                        ContactRegister.findOne({ "organizationPaperflowId": req.decoded.paperflowId }, function(err, contact) {

                            aadharCardPath = req.file.path
                            createdAt = todate
                            aadharCardstatus = "false"
                            checkedByAdmin = "No"
                            contact.aadharCard.push({ aadharCardPath, createdAt, aadharCardstatus, checkedByAdmin })
                            contact.save(function(err, da) {
                                if (err) {
                                    console.log(err)
                                    res.status(406).send({ status: -2, message: 'Invalid data' })
                                } //res.send(err);
                                else {

                                    res.end("File is uploaded");


                                }
                            });

                        })
                    }
                } else if (street == "TI") {

                    if (req.body.name == "license") {
                        //Training_com_Register.aggregate([{ $match: { paperflowId: req.decoded.paperflowId } }, { "$project": { "license": { "$slice": ["$licenseNumber", -1] } } }], function(err, d) {

                        Training_int_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {
                            console.log(d)
                            licensePath = req.file.path
                            checkedByAdmin = "No"
                            licenseStatus = "false"
                            licenseCreatedAt = todate
                            d.license.push({ licensePath, checkedByAdmin, licenseCreatedAt, licenseStatus })
                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })
                    }

                    if (req.body.name == 'pan') {
                        Training_int_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {
                            panPath = req.file.path
                            checkedByAdmin = "No"
                            panCreatedAt = todate
                            panStatus = "false"
                            d.pan.push({ panPath, checkedByAdmin, panCreatedAt, panStatus })
                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })
                    }
                    if (req.body.name == 'serviceTax') {
                        Training_int_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {
                            serviceTaxPath = req.file.path
                            serviceTaxCreatedAt = todate
                            serviceTaxStatus = "false"
                            checkedByAdmin = "No"
                            d.serviceTax.push({serviceTaxPath,serviceTaxCreatedAt,serviceTaxStatus,checkedByAdmin})

                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })
                    }
                    if (req.body.name == 'governmentId') {

                        ContactRegister.findOne({ "organizationPaperflowId": req.decoded.paperflowId }, function(err, contact) {

                            governmentIdPath = req.file.path
                            createdAt = todate
                            governmentIdStatus = "false"
                            checkedByAdmin = "No"
                            contact.governmentIdDetail.push({ governmentIdPath, createdAt, governmentIdStatus, checkedByAdmin })
                            contact.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } //res.send(err);
                                else {

                                    res.end("File is uploaded");


                                }
                            })
                        })
                    }
                    if (req.body.name == 'aadharCard') {

                        ContactRegister.findOne({ "organizationPaperflowId": req.decoded.paperflowId }, function(err, contact) {

                            aadharCardPath = req.file.path
                            createdAt = todate
                            aadharCardstatus = "false"
                            checkedByAdmin = "No"
                            contact.aadharCard.push({ aadharCardPath, createdAt, aadharCardstatus, checkedByAdmin })
                            contact.save(function(err, da) {
                                if (err) {
                                    console.log(err)
                                    res.status(406).send({ status: -2, message: 'Invalid data' })
                                } //res.send(err);
                                else {

                                    res.end("File is uploaded");


                                }
                            });

                        })
                    }
                } else if (street == "ITI") {


                    if (req.body.name == "license") {
                        Training_com_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {

                            licensePath = req.file.path
                            checkedByAdmin = "No"
                            licenseStatus = "false"
                            licenseCreatedAt = todate
                            d.license.push({ licensePath, checkedByAdmin, licenseCreatedAt, licenseStatus })
                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })
                    }
                    if (req.body.name == 'cin') {
                        Training_com_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {
                            cinPath = req.file.path
                            checkedByAdmin = "No"
                            cinCreatedAt = todate
                            cinStatus = "false"
                            d.cin.push({ cinPath, checkedByAdmin, cinCreatedAt, cinStatus })
                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })

                    }
                    if (req.body.name == 'pan') {
                        Training_com_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {
                            panPath = req.file.path
                            checkedByAdmin = "No"
                            panCreatedAt = todate
                            panStatus = "false"
                            d.pan.push({ panPath, checkedByAdmin, panCreatedAt, panStatus })
                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })
                    }
                    if (req.body.name == 'serviceTax') {
                        Training_com_Register.findOne({ paperflowId: req.decoded.paperflowId }, function(err, d) {
                            serviceTaxPath = req.file.path
                            serviceTaxCreatedAt = todate
                            serviceTaxStatus = "false"
                            checkedByAdmin = "No"

                            d.serviceTax.push({serviceTaxPath,serviceTaxCreatedAt,serviceTaxStatus,checkedByAdmin})
                            d.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } else {

                                    res.end("File is uploaded");
                                    // res.json({ status: 4, success: true, message: 'save and contact person required' })

                                }
                            });
                        })
                    }
                    if (req.body.name == 'governmentId') {

                        ContactRegister.findOne({ "organizationPaperflowId": req.decoded.paperflowId }, function(err, contact) {

                            governmentIdPath = req.file.path
                            createdAt = todate
                            governmentIdStatus = "false"
                            checkedByAdmin = "No"
                            contact.governmentIdDetail.push({ governmentIdPath, createdAt, governmentIdStatus, checkedByAdmin })
                            contact.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } //res.send(err);
                                else {

                                    res.end("File is uploaded");


                                }
                            })
                        })
                    }
                    if (req.body.name == 'aadharCard') {

                        ContactRegister.findOne({ "organizationPaperflowId": req.decoded.paperflowId }, function(err, contact) {

                            aadharCardPath = req.file.path
                            createdAt = todate
                            aadharCardstatus = "false"
                            checkedByAdmin = "No"
                            contact.aadharCard.push({ aadharCardPath, createdAt, aadharCardstatus, checkedByAdmin })
                            contact.save(function(err, da) {
                                if (err) {
                                    console.log(err)
                                    res.status(406).send({ status: -2, message: 'Invalid data' })
                                } //res.send(err);
                                else {

                                    res.end("File is uploaded");


                                }
                            });

                        })
                    }
                } else if (street == "SC") {

                    if (req.body.name == 'governmentId') {

                        ContactRegister.findOne({ "organizationPaperflowId": req.decoded.paperflowId }, function(err, contact) {

                            governmentIdPath = req.file.path
                            createdAt = todate
                            governmentIdStatus = "false"
                            checkedByAdmin = "No"
                            contact.governmentIdDetail.push({ governmentIdPath, createdAt, governmentIdStatus, checkedByAdmin })
                            contact.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } //res.send(err);
                                else {

                                    res.end("File is uploaded");


                                }
                            })
                        })
                    }

                    if (req.body.name == 'aadharCard') {

                        ContactRegister.findOne({ "organizationPaperflowId": req.decoded.paperflowId }, function(err, contact) {

                            aadharCardPath = req.file.path
                            createdAt = todate
                            aadharCardstatus = "false"
                            checkedByAdmin = "No"
                            contact.aadharCard.push({ aadharCardPath, createdAt, aadharCardstatus, checkedByAdmin })
                            contact.save(function(err, da) {
                                if (err) {
                                    return res.end("Error uploading file.");

                                } //res.send(err);
                                else {

                                    res.end("File is uploaded");


                                }
                            });

                        })
                    }
                } else {
                    console.log('nothing')
                }
            }
        
    })
}

















//             upload_contract(req, res, function(err) {

//                console.log(req.file)


//                 if (err) {
//                     res.json({ success: false, message: err });
//                     return;
//                 }

//                 if (!req.file) {
//                     res.json({ success: false, message: "No file passed" });
//                     return;
//                 }

//                 if (req.file) {
//                     var today = new Date()

//                     Profile.update({ pmb_id: decoded.pmb_id }, { $push: { contract: { contract_path: req.file.path, checked_by_admin: "No", created_at: today } } },function(err,data){
//                       if(!err){
//                           res.json({success:true})
//                           res.end()
//                       }else{
//                           res.json({success:false})
//                           res.end()
//                       }
//                     })


//                 }


//             })


//         }
//     })
// } else {
//     res.json({ success: false, message: "token not found" });
//     res.end();
// }


//           });
