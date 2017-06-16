var express = require('express');
var util = require('../../../util.js');
var student = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var studentrouter = express.Router();
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
