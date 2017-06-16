Addorder.count({ $and: [{ order_date: { $gte: req.body.start_date, $lte: req.body.end_date } }, { pmb_id: decoded.pmb_id }, { payment_type: req.body.payment_type }] }, function (err, count) {
                    
                    var page = req.params.page;
                    var skip = page > 1 ? ((page - 1) * 20) : 0;

                    Addorder.find({ $and: [{ order_date: { $gte: req.body.start_date, $lte: req.body.end_date } }, { pmb_id: decoded.pmb_id }, { payment_type: req.body.payment_type }] }).skip(skip).sort({ created_at: -1 }).limit(20).exec(function(err, orderdata) {
                     
                        if (err) {
                            res.json({ success: false, message: "cannot get order data" });
                            res.end();
                        } else {
                            res.json({ success: true, message: "order data success",document_size:count,data: orderdata  });
                            res.end();
                        }

                    })

                })

            }


            router.route('/csvorder')
    .post(function(req, res) {

        console.log(req.body)
         

        token = req.headers.token;
        if (token) {
            jwt.verify(token, 'superSecret', function(err, decoded) {
                if (err) {
                   
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {

                                var csv_order = [];
                                  var currentDate = new Date();
                                  var pin =[]

             for(var i=0; i<req.body.orders.length;i++){
          

                pin.push(parseInt(req.body.orders[i].pin_code))

        

                var csv_obj={
                                pmb_id       :  decoded.pmb_id,
                               // pmb_orderid  : "PMB_" +new Date().getTime(),
                                first_name   : req.body.orders[i].first_name,
                                last_name    : req.body.orders[i].last_name,
                                email        : req.body.orders[i].email,
                                phone_no     : req.body.orders[i].phone_no,
                                address_line1: req.body.orders[i].address_line1,
                                address_line2: req.body.orders[i].address_line2,
                                city         : req.body.orders[i].city,
                                state        : req.body.orders[i].state,
                                pin_code     : req.body.orders[i].pin_code,
                                country      : req.body.orders[i].country,
                                order_number : req.body.orders[i].order_number,
                                order_date   : req.body.orders[i].order_date,
                                payment_type : req.body.orders[i].payment_type,
                                order_total  : req.body.orders[i].order_total,  
                                status       : req.body.orders[i].status,
                                created_at   : currentDate,
                                cod_total    : req.body.orders[i].cod_total,
                                currency_type: req.body.orders[i].currency_type
    



             };

             csv_obj.items=[];
             req.body.orders[i].items.forEach(function(item){
                var itemObj={
                    item_name        :  item.name, 
                    item_price       :  item.price,    
                    item_quantity    :  item.quantity,
                    item_sku         :  item.sku  
                }
                csv_obj.items.push(itemObj);
             });

            csv_obj.store=[];
             req.body.orders[i].store.forEach(function(st){
                var storeObj={
                    store_name        :  st.store_name, 
                    store_type        :  st.store_type,    
                    store_id          :  st.store_id
                }
                csv_obj.store.push(storeObj);
             });

                csv_obj.manifest={
                            generated_manifest:false
                             }


                    console.log("-------------------")
                    console.log(csv_obj)
                        

                 csv_order.push(csv_obj);          

             }
            

                function saveorders(records, Model, match) {
                match = match || 'order_number';
                return new Promise(function(resolve, reject) {
                    var bulk = Model.collection.initializeUnorderedBulkOp();
                    records.forEach(function(record) {
                        var query = {pmb_id:decoded.pmb_id};
                        query[match] = record[match];
                        bulk.find(query).upsert().updateOne(record);
                    });
                    bulk.execute(function(err, bulkres) {
                        if (err) return reject(err);
                        resolve(bulkres);
                    });
                });
            }


            saveorders(csv_order, Addorder).then(function(bulkRes) {


            var serviceable_by_both;
            var aramex_a=[];
            var ecom_a=[];
            var pincodestatus =[]
            var counter=0;
            var not_in_both;
            var only_in_ecom;
            var only_in_aramex;
            var not_in_any;
            var ecom_r =[];
            

                var aramex_price = Aramex_pincode.find({},{pincode:1,_id:0}).exec();
                var ecom_price = Ecom_pincode.find({},{pincode:1,_id:0}).exec();
                var ecom_rest = Ecom_PincodeRest.find({},{pincode:1,_id:0}).exec();

                aramex_price.then(function(aramex) {
         
                    aramex.forEach(function(aramex_data){

                        aramex_a.push(parseInt(aramex_data.pincode))
                    })
                   
            
                ecom_price.then(function(ecom){
                 
                    
                    ecom.forEach(function(ecom_data){

                        ecom_a.push(parseInt(ecom_data.pincode))
                    })

                    console.log(ecom_a.length)



                ecom_rest.then(function(ecom_rest){

                    ecom_rest.forEach(function(ecom_restdata){

                        ecom_a.push(parseInt(ecom_restdata.pincode))
                    })

                    console.log(ecom_a.length)





                  serviceable_by_both = _.intersection(aramex_a,ecom_a)
              
                // var t =  _.difference(aramex_a, ecom_a);
                //            console.log(t)

          //    not_in_both =  _.difference(pin, serviceable_by_both);
                          

               only_in_aramex = _.difference(aramex_a, ecom_a);
                           
                           
                only_in_ecom = _.difference(ecom_a, aramex_a);
                          

              not_in_any = _.difference(pin, aramex_a,ecom_a);
              console.log(not_in_any)
           

                for(var k=0; k<req.body.orders.length;k++){

                       for (var i = 0; i < serviceable_by_both.length; i++) 
                    {           
                      
                           if(req.body.orders[k].pin_code == serviceable_by_both[i]){

 Addorder.update({ $and: [{pmb_id: decoded.pmb_id },{order_number: req.body.orders[k].order_number}]},{$set:{'pincode_status.serviceable_by_ecom':'yes','pincode_status.serviceable_by_aramex':'yes'}}).exec()

                               
                                        
                           }
                        
                       }

                   }

                   
                for(var k=0; k<req.body.orders.length;k++){

                       for (var i = 0; i < only_in_ecom.length; i++) 
                    {
              
                           if(req.body.orders[k].pin_code == only_in_ecom[i]){

 Addorder.update({ $and: [{pmb_id: decoded.pmb_id },{order_number: req.body.orders[k].order_number}]},{$set:{'pincode_status.serviceable_by_ecom':'yes','pincode_status.serviceable_by_aramex':'no'}}).exec()

                               
                                        
                           }
                        
                       }

                   }



                for(var k=0; k<req.body.orders.length;k++){

                       for (var i = 0; i < only_in_aramex.length; i++) 
                    {
              
                           if(req.body.orders[k].pin_code == only_in_aramex[i]){

 Addorder.update({ $and: [{pmb_id: decoded.pmb_id },{order_number: req.body.orders[k].order_number}]},{$set:{'pincode_status.serviceable_by_ecom':'no','pincode_status.serviceable_by_aramex':'yes'}}).exec()

                               
                                        
                           }
                        
                       }

                   }

                           for(var k=0; k<req.body.orders.length;k++){

                             for (var i = 0; i < not_in_any.length; i++) 
                    {

                             if(req.body.orders[k].pin_code == not_in_any[i]){

 Addorder.update({ $and: [{pmb_id: decoded.pmb_id },{order_number: req.body.orders[k].order_number}]},{$set:{'pincode_status.serviceable_by_ecom':'no','pincode_status.serviceable_by_aramex':'no'}}).exec()
 Addorder.update({ $and: [{pmb_id: decoded.pmb_id },{order_number: req.body.orders[k].order_number}]},{$set:{status:"non-serviceable"}}).exec()


}
}
}
             

           })
            })

            })
             

        res.json({ success: true})

            }, function(err) {
                console.log(err);
                res.json({ success: false })
            });
        

                }
            })
        } else {
            res.json({ success: false, message: "token not found" });
            res.end();
        }

    });

