var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var path=require('path')
var fs = require('file-system');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){

    upload(req,res,function(err) {
      console.log(req.file)
        if(err) {
          console.log(err)
            return res.end("Error uploading file.");
        }else{
        //console.log(req.files)
        res.end("File is uploaded");
      } 
    });
});


app.post('/download',function(req,res){
  //console.log(req.body.vpath)

  //var vpath=req.body.vpath;
  //console.log(vpath)

  res.sendFile(path.resolve(req.body.path));



})

app.post('/folder',function(req,res){

  var id='TC' + '-' + 91 + '-' + 'hr' + '-' + '0003'
console.log(id)
 fs.mkdir("uploads/"+id, function(err) {});

 })
var str = "How are you doing today?";
var res = str.split(" ", 3);

app.listen(3000,function(){
    console.log("Working on port 3000");
});