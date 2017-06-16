var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var multer  = require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null, '/home/yellow-01/Desktop/multer/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, 'dsf')
  }
})
 
var upload = multer({ storage: storage }).any();
//console.log(upload)



router.route('/load').put(function(req,res) {
  
upload(req,res,function(err) {
        //console.log(req.body);
        console.log(req.body);
        if(err) {
          console.log(err)
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});




module.exports = router;