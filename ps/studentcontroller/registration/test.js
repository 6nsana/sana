var express = require('express');
var student = express();
var mongoose = require('mongoose');
var studentrouter = express.Router();
var Student = require('../../../models/student');
var Login = require('../../../models/login');

var Student_Login = require('../../../models/student_login');

// exports.post = function(req, res) {
// var count=Login.find({ "password.password": req.body.password }).count()
// console.log("co",count)
//     Login.find({ "password.password": req.body.password }, function(error, data) {
//         console.log(data)
// console.log(data[0].password[0].password)
//             if (data == null || data == undefined || data == '') {
//                 res.json({ sucess: false, message: "not found" })
//             } else {
//                 var lastpasswordobj = data[0].password[data[0].password.length - 1]
//                 console.log(lastpasswordobj)
//                 var lastpassword=lastpasswordobj.password
//                 console.log(lastpassword)
//                 if (lastpassword == req.body.password) {
//                     res.json({ success: true })
//                 } else {
//                     res.json({ success: false })
//                 }
//             }
        

//     })
// }

exports.post = function(req, res) {
var count1=Login.find({ "password.password": req.body.password }).count().exec()
count1.then(function(data){
   console.log("co",data) 
})

    Login.find({ "password.password": req.body.password }, function(error, dataaa) {
        //console.log(dataaa)
//console.log(data[0].password[0].password)\


            if (dataaa == null || dataaa == undefined || dataaa == '') {
                console.log({ sucess: false, message: "not found" })
            } else {
                var fdata=dataaa.map(function(data){
                    //console.log("da",data)

                var lastpasswordobj = data.password[data.password.length - 1]
                //console.log(lastpasswordobj)
                var lastpassword=lastpasswordobj.password
                //console.log(lastpassword)
                if (lastpassword == req.body.password) {
                    return(data)
                    //res.json({ success: true })
                } else {
                    console.log({ success: false })
                }
            })
                console.log("final",fdata)
            }
        

    })

}