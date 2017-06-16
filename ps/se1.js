var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var Student = require('../../models/student');
var TempStudent = require('../../models/tempstudent');


exports.post = function(req, res) {

        var csv = function(temp) {
                console.log(temp)
                temp.forEach(function(data) {
                            console.log("hi", data)
                            //Promise.each(temp, function(data) {
                            //return new Promise(function(resolve, reject){

                            //console.log("hello", data.email[0].primary)

                            // temp.forEach(function(data) {
                            Student.findOne({
                                $or: [
                                    { "email.primary": data.email[0].primary },
                                    { "email.alternate": data.email[0].primary },
                                    { $and: [{ firstName: data.firstName }, { "father.fatherFirstName": data.fatherFirstName }, { "mother.motherFirstName": data.motherFirstName }, { "dateOfBirth.dob": data.dateOfBirth[0].dob }] }
                                ]
                            }, function(err, prim) {
                                if (prim == null) {
                                    Student.insert(data, function(err, sa) {
                                        if (!err) {
                                             console.log("save")
                                        } else {
                                             console.log(err)
                                        }
                                    })


                                } else if (prim != null) {
                                     console.log("update")
                                } else {
                                    console.log("err")
                                }
                            })
                        })





                            //     Student.findOne({ "email.primary": data.email[0].primary }, function(err, pri) {
                            //                     console.log("pri", pri)

                            //                     if (pri == null || pri == undefined || pri == '') {
                            //                         Student.findOne({ "email.alternate": data.email[0].primary }, function(err, mail) {
                            //                             if (mail == null || mail == undefined || mail == '') {
                            //                                 Student.findOne({ $and: [{ firstName: data.firstName}, { "father.fatherFirstName": data.fatherFirstName }, { "mother.motherFirstName": data.motherFirstName }, { "dateOfBirth.dob": data.dateOfBirth[0].dob }] }, function(err, name) {
                            //                                     if (name == null || name == undefined || name == '') {
                            //                                     Student.insert(data, function(err, sa) {
                            //                                             if (!err) {
                            //                                                 resolve("save")
                            //                                             } else {
                            //                                                 resolve(err)
                            //                                             }
                            //                                         })
                            //                                     } else {

                            //                                         console.log("Student found by name");

                            //                                     }
                            //                                 })
                            //                             } else {

                            //                                 console.log("Student found by alternate email");

                            //                             }

                            //                         })
                            //                     } else {

                            //                         console.log("Student found by primary email.");

                            //                     }
                            //                 })
                            // })




                            // }) //temp for each function
                        }


                        // function save(records, Model, match){
                        //   match = match && "email.primary"&&"email.alternate"&&("firstName"&&"father.fatherFirstName"&&"mother.motherFirstName"&&"dateOfBirth.dob");
                        //   return new Promise(function(resolve, reject){
                        //     var bulk = Model.collection.initializeUnorderedBulkOp();
                        //     records.forEach(function(record){
                        //       var query = {};
                        //       query[match] = record[match];
                        //       bulk.find(query).upsert().updateOne( record );
                        //     });
                        //     bulk.execute(function(err, bulkres){
                        //         if (err) return reject(err);
                        //         resolve(bulkres);
                        //     });
                        //   });
                        // }




                        var tempPromise = TempStudent.find().exec()

                        tempPromise.then(function(t) {
                            

                            return csv(t)

                        }, function(err) {
                            console.log("err" + err)
                            return csv(0)
                            //})   
                        }).then(function(response) {
                            console.log(response)
                                //res.json(response)
                        }, function(response) {
                            console.log("reject" + response)
                        })



                    } //exports




                    //         priPromise = Student.findOne({ "email.primary": data.email[0].primary }).exec()
                    //         priPromise.then(function(pi) {
                    //             console.log("pi",pi)
                    //             if (pi == null) {
                    //              alterPromise = Student.findOne({ "email.alternate": data.email[0].primary }).exec()
                    //                 alterPromise.then(function(alt) {
                    //                     console.log(alt)
                    //                     if (alt == null) {
                    //                         namePromise = Student.findOne({ $and: [{ firstName: data.firstName }, { "father.fatherFirstName": data.fatherFirstName }, { "mother.motherFirstName": data.motherFirstName }, { "dateOfBirth.dob": data.dateOfBirth[0].dob }] })
                    //                         namePromise.then(function(na) {
                    //                             if (na == null) {
                    //                                 Student.insert(data, function(err, sa) {
                    //                                     if (!err) {
                    //                                         console.log("save")
                    //                                     } else {
                    //                                         console.log(err)
                    //                                     }
                    //                                 })
                    //                             } else {
                    //                                 console.log("Student found by name");
                    //                             }
                    //                         }, function(err) {
                    //                             console.log("err1")
                    //                         })
                    //                     } else {
                    //                         console.log("Student found by alternate email");
                    //                     }
                    //                 }, function(err) {
                    //                     console.log("err2")
                    //                 })
                    //             } else {
                    //                 console.log("Student found by primary email.");
                    //             }
                    //         }, function(err) {
                    //             console.log("err3")
                    //         })


                            

                    // }) //promise
                    // Promise.all([priPromise,alterPromise,namePromise]).then(function(details) {


                    //         resolve("completed")
                    //     })
