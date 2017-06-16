var express = require('express');
var util=require('../util.js');
var router = express.Router();

var registration = require('../Routes/controller/registration');
router.post('/register',registration.post);

var reg = require('../Routes/controller/reg');
router.post('/reg',reg.post);
var regdata = require('../Routes/controller/regdata');
router.get('/regdata',util.checkToken,regdata.get);

var verify = require('../Routes/controller/verify');
router.post('/verify',verify.post);

var login = require('../Routes/controller/login');
router.post('/login',login.post);

var upload1 = require('../Routes/controller/upload1');
router.post('/upload1',util.checkToken,upload1.pic);

var register_training_company = require('../Routes/controller/register_training_company');
router.post('/register/training_company',util.checkToken,register_training_company.post);

var register_training_institute = require('../Routes/controller/register_training_institute');
router.post('/register/training_institute',util.checkToken,register_training_institute.post);

var register_school= require('../Routes/controller/register_school');
router.post('/register/school',util.checkToken,register_school.post);

var forgotPassword = require('../Routes/controller/forgotPassword');
router.post('/forgotpassword',forgotPassword.post);

var contact_person = require('../Routes/controller/contact_person');
router.post('/contact_person',util.checkToken,contact_person.post);


var changepassword = require('../Routes/controller/changepassword');
router.post('/changepassword',util.checkToken,changepassword.post);

var resendcode = require('../Routes/controller/resendcode');
router.put('/resendcode',resendcode.post);


var logout = require('../Routes/controller/logout');
router.get('/logout',logout.get);

//Training Comapany

   //course
var course_addcourse = require('../Routes/controller/training_company/course_addcourse');
router.post('/training_company/course/addcourse',util.checkToken,course_addcourse.post);

var course_getcourse = require('../Routes/controller/training_company/course_getcourse');
router.get('/training_company/course/getcourse',util.checkToken,course_getcourse.get);

var course_change_status = require('../Routes/controller/training_company/course_change_status');
router.put('/training_company/course/change_status',util.checkToken,course_change_status.post);

	//user
var user_adduser = require('../Routes/controller/training_company/user_adduser');
router.post('/training_company/user/adduser',util.checkToken,user_adduser.post);

var user_getuser = require('../Routes/controller/training_company/user_getuser');
router.get('/training_company/user/getuser',util.checkToken,user_getuser.get);

	//certificate
var certificate_addcertificate = require('../Routes/controller/training_company/certificate_addcertificate');
router.post('/training_company/certificate/addcertificate',util.checkToken,certificate_addcertificate.post);


var certificate_getcertificate = require('../Routes/controller/training_company/certificate_getcertificate');
router.get('/training_company/certificate/getcertificate',util.checkToken,certificate_getcertificate.get);

// var certificate_verify = require('../Routes/controller/training_company/certificate_verify');
// router.post('/training_company/certificate/verify',certificate_verify.post);

var certificate_issue = require('../Routes/controller/training_company/certificate_issue');
router.put('/training_company/certificate/issue',util.checkToken,certificate_issue.post);


	//event
var event_addevent = require('../Routes/controller/training_company/event_addevent');
router.post('/training_company/event/addevent',util.checkToken,event_addevent.post);



//Training Institute

 //course

var course_addcourse = require('../Routes/controller/training_int/course_addcourse');
router.post('/training_int/course/addcourse',util.checkToken,course_addcourse.post);

var course_getcourse = require('../Routes/controller/training_int/course_getcourse');
router.get('/training_int/course/getcourse',util.checkToken,course_getcourse.get);

var course_change_status = require('../Routes/controller/training_int/course_change_status');
router.post('/training_int/course/change_status',util.checkToken,course_change_status.post);

//certificate
var certificate_addcertificate = require('../Routes/controller/training_int/certificate_addcertificate');
router.post('/training_int/certificate/addcertificate',util.checkToken,certificate_addcertificate.post);


//School
var adduser = require('../Routes/controller/school/adduser');
router.post('/school/adduser',util.checkToken,adduser.post);

   //event
var event_addevent = require('../Routes/controller/school/event_addevent');
router.post('/school/event/addevent',util.checkToken,event_addevent.post);










module.exports = router;
