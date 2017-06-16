var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Register = require('../models/registration');
var email = require('emailjs');
var router = express.Router();
//var request = require('request');


var mailSender = email.server.connect({
    user: 'testuserdmt@gmail.com',
    password: 'Testuserdmt_1234',
    host: "smtp.gmail.com",
    ssl: true
});


router.route('/register').post(function(req, res) {

    register = new Register();
    register.name = req.body.name;
    register.mobileNumber = req.body.mobileNumber;
    register.email = req.body.email;
    register.locality = req.body.locality;
    register.question = req.body.question;


    Register.findOne({ email: req.body.email }, function(err, data) {
        if (data == null || data == undefined) {

            register.save(function(err) {
                if (err)
                     res.json({success:false,message:err});

                else {
                    var message = {
                        text: "",
                        from: "app <testuserdmt@gmail.com>",
                        to: req.body.email,
                        subject: "Register",
                        attachment: [{
                            data: "<html>Hi,<br><br> Thank you for registering with us.<br></html>",
                            alternative: true
                        }]
                    };
                    mailSender.send(message, function(err, data) {
                        console.log("mail send")
                    })
                    res.json({success:true, message: 'registration done!' });
                    res.end()
                }
            });
        } else
            res.json({success:true, message: 'registration already done!' });

    })
})

// router.route('/mail').post(function(req, res) {
//     var message = {
//         text: "",
//         from: "app <testuserdmt@gmail.com>",
//         to: req.body.email,
//         subject: "Register",
//         attachment: [{
//             data: "<html>Hi,<br><br> Thank you for registering with us.<br></html>",
//             alternative: true
//         }]
//     };
//     mailSender.send(message, function(err, data) {
//         console.log("mail send")
//         res.end()

//     })
// })


router.route('/getregister').get(function(req, res) {
    var reg = Register.find().exec()
    reg.then(function(dataa) {
        res.json({ sucess: true, data: dataa})
    }, function(err) {
        res.json({success:false,message:err})
    })
})





// router.route('/weather').post(function(req, res) {


// var path = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
// request(path, function(error, response, body) {
//     if(!error){
//     var data = JSON.parse(body);
//     console.log("data", data)
//     res.json(data)
// }else {
//     console.log(error)
// }

//     })
// })

module.exports = router;
