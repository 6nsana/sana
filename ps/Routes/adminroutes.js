var express = require('express');
var adminrouter = express.Router();

// var registration = require('../Routes/admincontroller/registration');
// adminrouter.post('/register',registration.post);

var download = require('../Routes/admincontroller/download');
adminrouter.post('/download',download.post);

var alluser = require('../Routes/admincontroller/alluser');
adminrouter.post('/all_user',alluser.post);

var userdata = require('../Routes/admincontroller/userdata');
adminrouter.post('/user_data',userdata.post);

var userAllUpload = require('../Routes/admincontroller/userAllUpload');
adminrouter.post('/user_allupload',userAllUpload.post);

var singleStatus_change = require('../Routes/admincontroller/singleStatus_change');
adminrouter.post('/single_status_change',singleStatus_change.post);


module.exports = adminrouter;