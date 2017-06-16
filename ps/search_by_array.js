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
        var typeobj = [];
        var obj = {};


        var loginPromise = Login.find({ paperflowId: { $in: req.body.array } }).exec()
        loginPromise.then(function(name) {
            //res.json(name)
            name.forEach(function(pid) {

                console.log(pid.typeOfOrganization)

                if (pid.typeOfOrganization == 001 || pid.typeOfOrganization == 003) {
                    var company = Training_com_Register.aggregate([{ $match: { "paperflowId": pid.paperflowId } }, { $lookup: { from: "contacts", localField: "paperflowId", foreignField: "organizationPaperflowId", as: "contactDetails" } }]).exec()
                    company.then(function(details) {
                            obj = { login: pid, organization: details }
                            typeobj.push(obj)
                            //res.json(typeObj)
                              
                        }, function(err) {
                            console.log("error in 001")
                        })
                 

                }
                if (pid.typeOfOrganization == 002) {
                    var inst = Training_int_Register.aggregate([{ $match: { "paperflowId": pid.paperflowId } }, { $lookup: { from: "contacts", localField: "paperflowId", foreignField: "organizationPaperflowId", as: "contactDetails" } }]).exec()
                    inst.then(function(instdetails) {

                            obj = { login: pid, organization: instdetails }
                            typeobj.push(obj)
                            console.log(typeobj)
                        }, function(err) {
                            console.log("error in 002")
                        })
                     
                }

                if (pid.typeOfOrganization == 004) {
                    var school = SchoolRegister.aggregate([{ $match: { "paperflowId": pid.paperflowId } }, { $lookup: { from: "contacts", localField: "paperflowId", foreignField: "organizationPaperflowId", as: "contactDetails" } }]).exec()
                    school.then(function(schooldetails) {
                        obj = { login: pid, organization: schooldetails }
                        typeobj.push(obj)
                        console.log(typeobj)
                    }, function(err) {
                        console.log("error in 003")
                            
                    })

                }
res.json({ data: typeobj })
                
            });
            //res.json({data:typeobj})
        }, function(err) {
            res.json("error")
        })
    }
    //var
