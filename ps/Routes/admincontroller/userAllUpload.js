var express = require('express');
var admin = express();
var adminrouter = express.Router();
var mongoose = require('mongoose');
var Login = require('../../models/login');
var ContactRegister = require('../../models/contact');
var Training_com_Register = require('../../models/training_company');
var Training_int_Register = require('../../models/training_ins');
var SchoolRegister = require('../../models/school');


exports.post = function(req, res) {
    if (req.body.typeOfOrganization == 001) {
        Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
            $project: { licenseNumber:1,_id:0,last: { $arrayElemAt: ["$license", -1] } }
        }], function(err, lin) {
            console.log(lin)


            Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                $project: { cinNumber: 1,_id:0, last: { $arrayElemAt: ["$cin", -1] } }
            }], function(err, cin) {
                console.log(cin)

                Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                    $project: {panNumber: 1,_id:0, last: { $arrayElemAt: ["$pan", -1] } }
                }], function(err, pan) {
                    console.log(pan)


                    Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                        $project: { serviceTaxNumber: 1,_id:0, last: { $arrayElemAt: ["$serviceTax", -1] } }
                    }], function(err, service) {
                        console.log(service)


                        ContactRegister.aggregate([{ $match: { "organizationPaperflowId": req.body.paperflowId } }, {
                            $project: { governmentIdName: 1,_id:0,governmentIdType:1,governmentIdNumber:1, last: { $arrayElemAt: ["$governmentIdDetail", -1] } }
                        }], function(err, gov) {
                            console.log(gov)


                            ContactRegister.aggregate([{ $match: { "organizationPaperflowId": req.body.paperflowId } }, {
                                $project: { aadharCardNumber: 1,_id:0, last: { $arrayElemAt: ["$aadharCard", -1] } }
                            }], function(err, aadhar) {
                                console.log(aadhar)

                                var obj1 = { lincense: lin, cin: cin, serviceTax: service, governmentIdDetail: gov, aadharCard: aadhar }
                                res.json({ success: true, data: obj1 })
                            })
                        })
                    })
                })
            })
        })
    }
    else if (req.body.typeOfOrganization == 002) {
        Training_int_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
            $project: { licenseNumber:1,_id:0, last: { $arrayElemAt: ["$license", -1] } }
        }], function(err, lin) {
            console.log(lin)


                Training_int_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                    $project: { panNumber: 1,_id:0, first: { $arrayElemAt: ["$pan", 0] }, last: { $arrayElemAt: ["$pan", -1] } }
                }], function(err, pan) {
                    console.log(pan)


                    Training_int_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                        $project: { serviceTaxNumber: 1,_id:0, last: { $arrayElemAt: ["$serviceTax", -1] } }
                    }], function(err, service) {
                        console.log(service)


                        ContactRegister.aggregate([{ $match: { "organizationPaperflowId": req.body.paperflowId } }, {
                            $project: { governmentIdName: 1,_id:0,governmentIdType:1,governmentIdNumber:1 , last: { $arrayElemAt: ["$governmentIdDetail", -1] } }
                        }], function(err, gov) {
                            console.log(gov)


                            ContactRegister.aggregate([{ $match: { "organizationPaperflowId": req.body.paperflowId } }, {
                                $project: { aadharCardNumber: 1,_id:0,last: { $arrayElemAt: ["$aadharCard", -1] } }
                            }], function(err, aadhar) {
                                console.log(aadhar)

                                var obj1 = { lincense: lin, serviceTax: service, governmentIdDetail: gov, aadharCard: aadhar }
                                res.json({ success: true, data: obj1 })
                            })
                        })
                    })
                })
            })
        
    }
    else if (req.body.typeOfOrganization == 003) {
        Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
            $project: { licenseNumber:1,_id:0, last: { $arrayElemAt: ["$license", -1] } }
        }], function(err, lin) {
            console.log(lin)


            Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                $project: { cinNumber: 1,_id:0,last: { $arrayElemAt: ["$cin", -1] } }
            }], function(err, cin) {
                console.log(cin)

                Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                    $project: { panNumber: 1,_id:0, last: { $arrayElemAt: ["$pan", -1] } }
                }], function(err, pan) {
                    console.log(pan)


                    Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                        $project: {  serviceTaxNumber: 1,_id:0, last: { $arrayElemAt: ["$serviceTax", -1] } }
                    }], function(err, service) {
                        console.log(service)


                        ContactRegister.aggregate([{ $match: { "organizationPaperflowId": req.body.paperflowId } }, {
                            $project: { governmentIdName: 1,_id:0,governmentIdType:1,governmentIdNumber:1 , last: { $arrayElemAt: ["$governmentIdDetail", -1] } }
                        }], function(err, gov) {
                            console.log(gov)


                            ContactRegister.aggregate([{ $match: { "organizationPaperflowId": req.body.paperflowId } }, {
                                $project: { aadharCardNumber: 1,_id:0, last: { $arrayElemAt: ["$aadharCard", -1] } }
                            }], function(err, aadhar) {
                                console.log(aadhar)

                                var obj1 = { lincense: lin, cin: cin, serviceTax: service, governmentIdDetail: gov, aadharCard: aadhar }
                                res.json({ success: true, data: obj1 })
                            })
                        })
                    })
                })
            })
        })
    }else if (req.body.typeOfOrganization == 004) {
        SchoolRegister.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
            $project: { paperflowId: 1, first: { $arrayElemAt: ["$license", 0] }, last: { $arrayElemAt: ["$license", -1] } }
        }], function(err, lin) {
            console.log(lin)


            SchoolRegister.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                $project: { paperflowId: 1, first: { $arrayElemAt: ["$cin", 0] }, last: { $arrayElemAt: ["$cin", -1] } }
            }], function(err, cin) {
                console.log(cin)

                SchoolRegister.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                    $project: { paperflowId: 1, first: { $arrayElemAt: ["$pan", 0] }, last: { $arrayElemAt: ["$pan", -1] } }
                }], function(err, pan) {
                    console.log(pan)


                    SchoolRegister.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                        $project: { paperflowId: 1, first: { $arrayElemAt: ["$serviceTax", 0] }, last: { $arrayElemAt: ["$serviceTax", -1] } }
                    }], function(err, service) {
                        console.log(service)


                        ContactRegister.aggregate([{ $match: { "organizationPaperflowId": req.body.paperflowId } }, {
                            $project: { governmentIdName: 1,_id:0,governmentIdType:1,governmentIdNumber:1 , last: { $arrayElemAt: ["$governmentIdDetail", -1] } }
                        }], function(err, gov) {
                            console.log(gov)


                            ContactRegister.aggregate([{ $match: { "organizationPaperflowId": req.body.paperflowId } }, {
                                $project: { aadharCardNumber: 1,_id:0, last: { $arrayElemAt: ["$aadharCard", -1] } }
                            }], function(err, aadhar) {
                                console.log(aadhar)

                                var obj1 = { lincense: lin, cin: cin, serviceTax: service, governmentIdDetail: gov, aadharCard: aadhar }
                                res.json({ success: true, data: obj1 })
                            })
                        })
                    })
                })
            })
        })
    }

}
