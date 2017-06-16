var express = require('express');
var admin = express();
var adminrouter = express.Router();
var mongoose = require('mongoose');
var Login = require('../../models/login');
var ContactRegister = require('../../models/contact');

exports.post = function(req, res) {

    var co;
    var nameObj = [];
    var filter = {};
    console.log(req.body.filter)
    if (req.body.filter.typeOfOrganization || req.body.filter.nameOfOrganization) {
        //console.log(req.body.filter.typeOfOrganization)
        if (req.body.filter.typeOfOrganization && req.body.filter.nameOfOrganization) {
            patten = req.body.filter.nameOfOrganization
            filter = { typeOfOrganization: req.body.filter.typeOfOrganization, nameOfOrganization: { $regex: patten } }
            console.log(filter)
        } else if (req.body.filter.nameOfOrganization) {

            patten = req.body.filter.nameOfOrganization
            filter = { nameOfOrganization: { $regex: patten } };
            //console.log(filter)
        } else if (req.body.filter.typeOfOrganization) {
            filter = req.body.filter;
            //console.log(filter)
        }


        var size = parseInt(req.params.size);
        var page = parseInt(req.params.page) - 1;
        var skip = size * page;

        var countPromise = Login.count({ $and: [{ "authorityType": "Main User" }, filter] }).exec();

        countPromise.then(function(count) {
            co = count;
            console.log(co)
        }, function(err) {
            console.log(err)
        })

        namePromise = Login.find({ $and: [{ "authorityType": "Main User" }, filter] }).skip(skip).limit(size).exec();


        namePromise.then(function(name) {
            //console.log(name)
            name.forEach(function(pid) {

                console.log(pid.paperflowId)
                nameObj.push(pid.paperflowId);

            });
        }, function(err) {
            console.log(err)
        })

        Promise.all([countPromise, namePromise]).then(function(pre) {
            res.json({ success: true, documentSize: co, data: nameObj })
            res.end()
        }, function(err) {
            res.json({ suucess: false, message: err })
                //console.log(err)
        })

    } else if (req.body.filter.firstName || req.body.filter.lastName || req.body.filter.dateOfBirth) {


        if (req.body.filter.firstName && req.body.filter.lastName && req.body.filter.dateOfBirth) {

            patten1 = req.body.filter.lastName
            patten = req.body.filter.firstName
            filter = { firstName: { $regex: patten }, lastName: { $regex: patten1 }, "dateOfBirth.dob": req.body.filter.dateOfBirthk }
            console.log(filter)

        } else if (req.body.filter.firstName && req.body.filter.lastName) {

            patten1 = req.body.filter.lastName
            patten = req.body.filter.firstName
            filter = { firstName: { $regex: patten }, lastName: { $regex: patten1 } }
            console.log(filter)
        } else if (req.body.filter.firstName) {
            patten = req.body.filter.firstName
            filter = { firstName: { $regex: patten } }
            console.log(filter)
        } else if (req.body.filter.dateOfBirth) {
            filter = { "dateOfBirth.dob": req.body.filter.dateOfBirth }
            console.log(filter)
        } else if (req.body.filter.lastName) {
            patten = req.body.filter.lastName
            filter = { lastName: { $regex: patten } }
            console.log(filter)
        }

        var size = parseInt(req.params.size);
        var page = parseInt(req.params.page) - 1;
        var skip = size * page;

        var countPromise = ContactRegister.count({ $and: [{ "authorityType": "super admin" }, filter] }).exec();

        countPromise.then(function(count) {
            co = count;
            console.log(co)
        }, function(err) {
            console.log(err)
        })

        contactPromise = ContactRegister.find({ $and: [{ "authorityType": "super admin" }, filter] }).skip(skip).limit(size).exec();


        contactPromise.then(function(name) {
            //console.log(name)
            name.forEach(function(pid) {

                console.log(pid.organizationPaperflowId)
                nameObj.push(pid.organizationPaperflowId);

            });
        }, function(err) {
            console.log(err)
        })

        Promise.all([countPromise, contactPromise]).then(function(pre) {
            res.json({ success: true, documentSize: co, data: nameObj })
            res.end()
        }, function(err) {
            res.json({ suucess: false, message: err })
                //console.log(err)
        })






    }


}
