var mongoose = require('mongoose');
var RegistrationSchema = mongoose.Schema({


    name                 : { type: String },
    mobileNumber         : { type: String },
    email                : { type: String },
    locality             : { type: String },
    question             : { type: String }
    

          
   });

	module.exports = mongoose.model('Registration', RegistrationSchema);