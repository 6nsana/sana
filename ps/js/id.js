var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Register = require('../../models/registration');
var ContactRegister = require('../../models/contact');
var Login = require('../../models/login');
var Training_int_Register = require('../../models/training_ins');
var Training_com_Register = require('../../models/training_company');
var SchoolRegister = require('../../models/school');

var router = express.Router();

exports.post = function(req, res) {

    var tfo = req.body.typeOfOrganization;

    if (tfo == 001) {

        Training_com_Register.findOne({ paperflowId: { $regex: 'TC' + '/' + req.body.country + '/' + req.body.state } }, { paperflowId: 1, _id: 0 }).sort({ paperflowId: -1 }).limit(1).exec(function(err, data) {

            if (data == null || data == 'undefined') {


                Training_com_Register.update({ email: req.body.email }, { $set: { paperflowId: 'TC' + '/' + req.body.country + '/' + req.body.state + '/' + '0001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push" })

                    } else {
                        console.log(data)
                    }
                })


                ContactRegister.update({ "email.primary": req.body.email }, { $set: { paperflowId: 'TC' + '/' + req.body.country + '/' + req.body.state + '/' + '0001'+'/'+'CP001'} }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push2" })

                    } else {
                        console.log(data)
                    }
                })
                Login.update({ email: req.body.email }, { $set: { paperflowId: 'TC' + '/' + req.body.country + '/' + req.body.state + '/' + '0001' } }).exec(function(err, data) {
                    if (err) {
                        res.json({ success: false, message: "not push3" })

                    } else {
                        res.json(data)
                    }
                })



            } else {

                console.log(data.paperflowId)


                v = data.paperflowId
                console.log(v)

                var values = v.split('/');


                var street = values[3];
                console.log(street)

                yourNumber = parseInt(street, 16);
                console.log(yourNumber)

                var i = yourNumber + 1;
                n = i.toString(16)
                x = n.length;
                console.log(x)
                digit = 4 - x;
                if (digit == 3)
                    id = '000' + n
                if (digit == 2)
                    id = '00' + n
                if (digit == 1)
                    id = '0' + n
                if (digit == 0)
                    id = n
                console.log(id)


                Training_com_Register.update({ email: req.body.email }, { $set: { paperflowId: 'TC' + '/' + req.body.country + '/' + req.body.state + '/' + id } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push" })

                    } else {
                        console.log(data)
                    }
                })


                ContactRegister.update({ "email.primary": req.body.email }, { $set: { paperflowId: 'TC' + '/' + req.body.country + '/' + req.body.state + '/' + id +'/'+'CP001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push2" })

                    } else {
                        console.log(data)
                    }
                })

                Login.update({ email: req.body.email }, { $set: { paperflowId: 'TC' + '/' + req.body.country + '/' + req.body.state + '/' + id } }).exec(function(err, data) {
                    if (err) {
                        res.json({ success: false, message: "not push3" })

                    } else {
                        res.json(data)
                    }
                })


            }

        })
    }

    if (tfo == 002) {

        Training_int_Register.findOne({ paperflowId: { $regex: 'TI' + '/' + req.body.country + '/' + req.body.state } }, { paperflowId: 1, _id: 0 }).sort({ paperflowId: -1 }).limit(1).exec(function(err, data) {
            console.log(data)
            if (data == null || data == 'undefined') {


                Training_int_Register.update({email: req.body.email},{$set: {paperflowId : 'TI' + '/' + req.body.country + '/' + req.body.state + '/' + '0001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push" })

                    } else {
                        console.log(data)
                    }
                })
                ContactRegister.update({ "email.primary": req.body.email }, { $set: { paperflowId: 'TI' + '/' + req.body.country + '/' + req.body.state + '/' + '0001'+'/'+'CP001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push2" })

                    } else {
                        console.log(data)
                    }
                })

                Login.update({ email: req.body.email }, { $set: { paperflowId: 'TI' + '/' + req.body.country + '/' + req.body.state + '/' + '0001' } }).exec(function(err, data) {
                    if (err) {
                        res.json({ success: false, message: "not push3" })

                    } else {
                        res.json(data)
                    }
                })

            } else {

                console.log(data.paperflowId)


                v = data.paperflowId
                console.log(v)

                var values = v.split('/');


                var street = values[3];
                console.log(street)

                yourNumber = parseInt(street, 16);
                console.log(yourNumber)

                var i = yourNumber + 1;
                n = i.toString(16)
                x = n.length;
                console.log(x)
                digit = 4 - x;
                if (digit == 3)
                    id = '000' + n
                if (digit == 2)
                    id = '00' + n
                if (digit == 1)
                    id = '0' + n
                if (digit == 0)
                    id = n
                console.log(id)

                Training_int_Register.update({ email: req.body.email },{ $set: { paperflowId : 'TI' + '/' + req.body.country + '/' + req.body.state + '/' + id } }).exec(function(err, data) {
                //Training_int_Register.update({ email: req.body.email }, { $set: { paperflowId: 'TI' + '/' + req.body.country + '/' + req.body.state + '/' + id } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push" })

                    } else {
                        console.log(err)
                    }
                })


                ContactRegister.update({ "email.primary": req.body.email }, { $set: { paperflowId: 'TI' + '/' + req.body.country + '/' + req.body.state + '/' + id+'/'+'CP001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push2" })

                    } else {
                        console.log(data)
                    }
                })


                Login.update({ email: req.body.email }, { $set: { paperflowId: 'TI' + '/' + req.body.country + '/' + req.body.state + '/' + id} }).exec(function(err, data) {
                    if (err) {
                        res.json({ success: false, message: "not push3" })

                    } else {
                        res.json(data)
                    }
                })
            }

        })
    }


    if (tfo == 003) {

        Training_com_Register.findOne({ paperflowId: { $regex: 'ITI' + '/' + req.body.country + '/' + req.body.state } }, { paperflowId: 1, _id: 0 }).sort({ paperflowId: -1 }).limit(1).exec(function(err, data) {

            if (data == null || data == 'undefined') {


                Training_com_Register.update({ email: req.body.email }, { $set: { paperflowId: 'ITI' + '/' + req.body.country + '/' + req.body.state + '/' + '0001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push" })

                    } else {
                        console.log(data)
                    }
                })
                ContactRegister.update({ "email.primary": req.body.email }, { $set: { paperflowId: 'ITI' + '/' + req.body.country + '/' + req.body.state + '/' + '0001'+'/'+'CP001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push2" })

                    } else {
                        console.log(data)
                    }
                })
                Login.update({ email: req.body.email }, { $set: { paperflowId: 'ITI' + '/' + req.body.country + '/' + req.body.state + '/' + '0001' } }).exec(function(err, data) {
                    if (err) {
                        res.json({ success: false, message: "not push3" })

                    } else {
                        res.json(data)
                    }
                })
            } else {

                console.log(data.paperflowId)


                v = data.paperflowId
                console.log(v)

                var values = v.split('/');


                var street = values[3];
                console.log(street)

                yourNumber = parseInt(street, 16);
                console.log(yourNumber)

                var i = yourNumber + 1;
                n = i.toString(16)
                x = n.length;
                console.log(x)
                digit = 4 - x;
                if (digit == 3)
                    id = '000' + n
                if (digit == 2)
                    id = '00' + n
                if (digit == 1)
                    id = '0' + n
                if (digit == 0)
                    id = n
                console.log(id)


                Training_com_Register.update({ email: req.body.email }, { $set: { paperflowId: 'ITI' + '/' + req.body.country + '/' + req.body.state + '/' + id } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push" })

                    } else {
                        console.log(data)
                    }
                })


                ContactRegister.update({ "email.primary": req.body.email }, { $set: { paperflowId: 'ITI' + '/' + req.body.country + '/' + req.body.state + '/' + id+'/'+'CP001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push2" })

                    } else {
                        console.log(data)
                    }
                })


                Login.update({ email: req.body.email }, { $set: { paperflowId: 'ITI' + '/' + req.body.country + '/' + req.body.state + '/' + id } }).exec(function(err, data) {
                    if (err) {
                        res.json({ success: false, message: "not push3" })

                    } else {
                        res.json(data)
                    }
                })



            }

        })
    }




    if (tfo == 004) {

        SchoolRegister.findOne({ paperflowId: { $regex: 'SC' + '/' + req.body.country + '/' + req.body.state } }, { paperflowId: 1, _id: 0 }).sort({ paperflowId: -1 }).limit(1).exec(function(err, data) {

            if (data == null || data == 'undefined') {


                SchoolRegister.update({ email: req.body.email }, { $set: { paperflowId: 'SC' + '/' + req.body.country + '/' + req.body.state + '/' + '0001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push" })

                    } else {
                        console.log(data)
                    }
                })

                ContactRegister.update({"email.primary": req.body.email }, { $set: { paperflowId: 'SC' + '/' + req.body.country + '/' + req.body.state + '/' + '0001'+'/'+'CP001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push2" })

                    } else {
                        console.log(data)
                    }
                })


                Login.update({ email: req.body.email }, { $set: { paperflowId: 'SC' + '/' + req.body.country + '/' + req.body.state + '/' + '0001'} }).exec(function(err, data) {
                    if (err) {
                        res.json({ success: false, message: "not push3" })

                    } else {
                        res.json(data)
                    }
                })
            } else {

                console.log(data.paperflowId)


                v = data.paperflowId
                console.log(v)

                var values = v.split('/');


                var street = values[3];
                console.log(street)

                yourNumber = parseInt(street, 16);
                console.log(yourNumber)

                var i = yourNumber + 1;
                n = i.toString(16)
                x = n.length;
                console.log(x)
                digit = 4 - x;
                if (digit == 3)
                    id = '000' + n
                if (digit == 2)
                    id = '00' + n
                if (digit == 1)
                    id = '0' + n
                if (digit == 0)
                    id = n
                console.log(id)


                SchoolRegister.update({ email: req.body.email }, { $set: { paperflowId: 'SC' + '/' + req.body.country + '/' + req.body.state + '/' + id } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push" })

                    } else {
                        console.log(data)
                    }
                })


                ContactRegister.update({"email.primary": req.body.email }, { $set: { paperflowId: 'SC' + '/' + req.body.country + '/' + req.body.state + '/' + id+'/'+'CP001' } }).exec(function(err, data) {
                    if (err) {
                        console.log({ success: false, message: "not push2" })

                    } else {
                        console.log(data)
                    }
                })



                Login.update({ email: req.body.email }, { $set: { paperflowId: 'SC' + '/' + req.body.country + '/' + req.body.state + '/' + id } }).exec(function(err, data) {
                    if (err) {
                        res.json({ success: false, message: "not push3" })

                    } else {
                        res.json(data)
                    }
                })

            }

        })
    }

}
