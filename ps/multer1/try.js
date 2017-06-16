 var contract_store = multer.diskStorage({
          destination: function(req, file, cb) {
              cb(null, './user/contract_upload')
          },
          filename: function(req, file, cb) {
              cb(null,Date.now() + '-' + file.originalname)
          }
      })

    var upload_contract = multer({ storage: contract_store }).single('file');


router.route('/user_contract')
        .post(function(req, res) {
            
  token = req.headers.token;
  if (token) {
      jwt.verify(token, 'superSecret', function(err, decoded) {
          if (err) {

              return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {

              upload_contract(req, res, function(err) {

                 console.log(req.file)
        
              
                  if (err) {
                      res.json({ success: false, message: err });
                      return;
                  }

                  if (!req.file) {
                      res.json({ success: false, message: "No file passed" });
                      return;
                  }

                  if (req.file) {
                      var today = new Date()

                      Profile.update({ pmb_id: decoded.pmb_id }, { $push: { contract: { contract_path: req.file.path, checked_by_admin: "No", created_at: today } } },function(err,data){
                        if(!err){
                            res.json({success:true})
                            res.end()
                        }else{
                            res.json({success:false})
                            res.end()
                        }
                      })


                  }


              })


          }
      })
  } else {
      res.json({ success: false, message: "token not found" });
      res.end();
  }


            });








//------------------------------


    var storage = multer.diskStorage({ 
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

    var upload = multer({ //multer settings
                    storage: storage,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['csv'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }
                }).single('file');


router.route('/upload/courier_service')
        .post(function(req, res) {
        
        var exceltojson;
        upload(req,res,function(err){
            console.log(req.file)
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
        
            if(!req.file){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'csv'){
                exceltojson = node_cj;
            }else{
                console.log("wrong extension")
            }   
            try {
                exceltojson({
                    input: req.file.path,
                    output: null,
                }, function(err,result){
                    if(err) {
                        console.log(err)
                        return res.json({error_code:1,err_desc:err, data: null});
                    } 

            Ecom_pincode.collection.insert(result, onInsert);

                function onInsert(err, docs) {

                   if (err) {

                        res.json({success:false})
                    } else {
                       res.json({success:true})
                    }
                }

                });
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        })
       
    });

    /////------------------------------------------

     var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
    console.log(req)
    console.log(file)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
    //console.log(req)
    //console.log(file)
  }
})


  var upload = multer({ storage: storage }).single('cin');
   //var uploadss = multer({ storage: storage }).single('ln',2);



router.route('/upload').post(function(req, res) {
  //console.log(req.files.path)

       upload(req,res,function(err) {
        if(err) {
         // console.log(err)
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });


    //    uploadss(req,res,function(err) {
    //     if(err) {
    //      // console.log(err)
    //         return res.end("Error uploading file.");
    //     }
    //     res.end("File is uploaded");
    // });
});
//-------------------------------

adminrouter.route('/download_contract')
            .post(function(req, res) {
                
        console.log( req.body.contract_path)
               
var contract_path = req.body.contract_path+'.pdf'
        console.log(contract_path)

      res.sendFile(path.resolve(contract_path));
           
})