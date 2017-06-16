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
            if (req.body.name == "license") {
                Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                        $project: {last: { $arrayElemAt: ["$license", -1] }} }], function(err, data) {
                        if (!err) {

                            console.log(data[0].last.licenseStatus)
                            licenseStatus=req.body.status;
                            checkedByAdmin='YES'
                            data[0].last.push({licenseStatus,checkedByAdmin})
                            data[0].save(function(err,dataa){
                                if(!err){
                                    res.json({ success: true, data: data })
                                    }
                                    else{
                                        res.json({ sucess: false })
                                    }
                               })
                        } else {
                            res.json({ sucess: false })
                        }
                    })
        } 
        else if (req.body.name == "cin") {
            Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                    $project: {
                       
                        last: { $arrayElemAt: ["$cin", -1] }
                    }
                }], function(err, data) {
                    if (!err) {
                        res.json({ success: true, data: data })
                    } else {
                        res.json({ sucess: false })
                    }
                })

    } 
    else if (req.body.name == "pan") {
        Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
                $project: {
                    paperflowId: 1,
                    first: { $arrayElemAt: ["$pan", 0] },
                    last: { $arrayElemAt: ["$pan", -1] }
                }
            }], function(err, data) {
                if (!err) {
                    res.json({ success: true, data: data })
                } else {
                    res.json({ sucess: false })
                }
            })

}
else if (req.body.name == "pan") {
    Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
            $project: {
                paperflowId: 1,
                first: { $arrayElemAt: ["$pan", 0] },
                last: { $arrayElemAt: ["$pan", -1] }
            }
        }], function(err, data) {
            if (!err) {
                res.json({ success: true, data: data })
            } else {
                res.json({ sucess: false })
            }
        })

}
else if (req.body.name == "serviceTax") {
    Training_com_Register.aggregate([{ $match: { paperflowId: req.body.paperflowId } }, {
            $project: {
                paperflowId: 1,
                first: { $arrayElemAt: ["$serviceTax", 0] },
                last: { $arrayElemAt: ["$serviceTax", -1] }
            }
        }], function(err, data) {
            if (!err) {
                res.json({ success: true, data: data })
            } else {
                res.json({ sucess: false })
            }
        })

}
}
}
