var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();

exports.post = function(req, res) {



function stu(student)
{
	console.log(student)
	return new Promise(function(resolve, reject) {

	var studentData = student.map(function(data) {
                    return {
                        
                        firstName: data.firstName,
                        middleName: data.middleName,
                        lastName: data.lastName,
                        gender: data.gender,
                        
                        father: data.father,
                        dateOfBirth: data.dateOfBirth,
                        mother: data.mother,
                        contactNumber: data.contactNumber
                        
                        //createdAt: currentdate.currentdate()
                    }
                })
	res.json("studata",studentData)
	resolve(studentData)
})
}

console.log("req.body",req.body.students)
	var stud = stu(req.body.students)
	console.log(stud)
	stud.then(function(data){
	console.log(data)
},function(err){
	console.log(err)
})
}











{
"students": [
        {
"firstName": "house",
"middleName": "user",
"lastName": "condition",
"gender": "male",
"father": [{
                        "fatherFirstName": "housing",
                        "fatherMiddleName": "user",
                        "fatherLastName": "condition",
                        "fatherEmail": "housing@user.com"
        }],
"dateOfBirth": [{
                                "dob": "2012-04-23T18:25:43.511Z"
                                }],

"mother": [{
                "motherFirstName": "homing",
                "motherMiddleName": "user",
                "motherLastName": "condition",
                "motherEmail": "housings@user.com"
        }],

"contactNumber": [{
                                "primary": "1234561745"
                                }]
        }
        ]}
