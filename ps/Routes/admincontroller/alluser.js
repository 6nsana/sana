var express = require('express');
var admin = express();
var adminrouter = express.Router();
var mongoose = require('mongoose');
var Login = require('../../models/login');
var ContactRegister = require('../../models/contact');

exports.post = function(req, res) {
    var item = [];
    count = 0;

    if (req.body.typeOfOrganization.length == 0) {
        console.log(req.body.typeOfOrganization.length)

        Login.find({ 'status': '5' }).sort({ lastmodified: 1 }).exec(function(err, dataa) {
            console.log(dataa.length)
            dataa.forEach(function(data, index) {
                console.log(data.paperflowId)
                ContactRegister.findOne({ $and: [{ typeOfOrganization: data.typeOfOrganization }, { nameOfOrganization: data.nameOfOrganization }, { organizationPaperflowId: data.paperflowId }] }, function(err, daa) {

                    item.push(daa)
                    console.log(item)

                    if (++count == dataa.length) {
                        res.json({ success: true, data: item })
                        res.end()
                    }
                })
            })
        })

    } 
    else if (req.body.typeOfOrganization.length != 0) {
        console.log(req.body.typeOfOrganization.length)

        Login.find({ $and: [{ 'status': '5' }, { typeOfOrganization: req.body.typeOfOrganization }] }).sort({ lastmodified: 1 }).exec(function(err, dataa) {
                console.log(dataa.length)
                console.log(dataa)
                if (dataa != 0) {
                    dataa.forEach(function(data, index) {
                            console.log(data.paperflowId)

                            ContactRegister.findOne({ $and: [{ typeOfOrganization: data.typeOfOrganization }, { nameOfOrganization: data.nameOfOrganization }, { organizationPaperflowId: data.paperflowId }] }, function(err, daa) {

                                item.push(daa)
                                console.log(item)

                                if (++count == dataa.length) {
                                    res.json({ success: true, data: item })
                                    res.end()
                                }
                            })
                        })
                }
                else {
                            res.json('No organization is register')
                        }
            
        })


} else {
    res.json(err)
}
}



// 	{
// Training_com_Register.aggregate([
//     {
//       $lookup:
//         {
//           from: "ContactRegister",
//           localField: "paperflowId",
//           foreignField: "organizationPaperflowId",
//           as: "contact_docs"
//         }
//    }
// ])
// 	}
