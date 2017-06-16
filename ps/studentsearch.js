var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var Student = require('../../models/student');
var TempStudent = require('../../models/tempstudent');
var Training_com_Register = require('../../models/training_company');
var Training_int_Register = require('../../models/training_ins');
var SchoolRegister = require('../../models/school');

exports.post = function(req, res) {


        var tempPromise = TempStudent.find().exec()
        tempPromise.then(function(t) {
            return csv(t)
        })



        var csv = function(temp) {



                //console.log(temp)
                temp.forEach(function(data) {



                        // console.log("temp",data)

                        student = new Student()

                        typeOfOrganization = data.organization[0].typeOfOrganization
                        nameOfOrganization = data.organization[0].nameOfOrganization
                        organizationPaperflowId = data.organization[0].organizationPaperflowId
                        student.organization.push({ typeOfOrganization, nameOfOrganization, organizationPaperflowId })


                        student.firstName = data.firstName;
                        student.middleName = data.middleName;
                        student.lastName = data.lastName;
                        dob = data.dateOfBirth[0].dob;
                        student.dateOfBirth.push({ dob })

                        student.gender = data.gender;
                        student.nationality = '1'
                        fatherFirstName = data.father[0].fatherFirstName;
                        fatherMiddleName = data.father[0].fatherMiddleName;
                        fatherLastName = data.father[0].fatherLastName;
                        fatherEmail = data.father[0].fatherEmail;
                        student.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail })

                        motherFirstName = data.mother[0].motherFirstName;
                        motherMiddleName = data.mother[0].motherMiddleName;
                        motherLastName = data.mother[0].motherLastName;
                        motherEmail = data.mother[0].motherEmail;
                        student.mother.push({ motherFirstName, motherMiddleName, motherLastName, motherEmail })


                        primary = parseInt(data.contactNumber[0].primary);

                        lastModified = new Date()
                        student.contactNumber.push({ primary, lastModified })

                        primary = data.email[0].primary;

                        student.email.push({ primary })

                        console.log("--------------")



                        Student.findOne({ "email.primary": data.email[0].primary }, function(err, pri) {
                                console.log("pri", pri)

                                if (pri == null || pri == undefined || pri == '') {
                                    Student.findOne({ "email.alternate": data.email[0].primary }, function(err, mail) {
                                        console.log("alter", mail)
                                        if (mail == null || mail == undefined || mail == '') {
                                            Student.findOne({ $and: [{ firstName: data.firstName }, { lastName: data.lastName }, { "mother.motherFirstName": data.mother[0].motherFirstName }, { "mother.motherLastName": data.mother[0].motherLastName }, { "dateOfBirth.dob": data.dateOfBirth[0].dob }] }, function(err, name) {

                                                console.log("name", name)
                                                if (name == null || name == undefined || name == '') {
                                                    student.paperflowId = "ST" + data.firstName + data.lastName + data.mother[0].motherFirstName + data.mother[0].motherFirstName + data.dateOfBirth[0].dob
                                                    var pid = student.paperflowId

                                                    student.save(function(err) {
                                                        if (!err) {
                                                            console.log('save')
                                                        } else {
                                                            console.log("error", err)
                                                        }
                                                    })

                                                    add_in_org(data, pid).then(function(response) {
                                                        console.log(response)
                                                    }, function(response) {
                                                        console.log(response)
                                                    })


                                                } //if of studentent name
                                                else {
                                                    console.log("Student found by name");
                                                    var pid = name.paperflowId;
                                                    add_in_org(name, pid).then(function(response) {
                                                        console.log("res", response)
                                                    }, function(response) {
                                                        console.log(response)
                                                    })

                                                    if (name.contactNumber[0].primary != data.contactNumber[0].primary) {
                                                        primary = parseInt(data.contactNumber[0].primary);
                                                        lastModified = new Date()
                                                        name.contactNumber.push({ primary, lastModified })
                                                        name.save(function(err) {
                                                            if (!err) {
                                                                console.log("number save")
                                                            }
                                                        })
                                                    }
                                                    if (name.email[0].primary != data.email[0].primary) {
                                                        console.log(name.email[0].primary)
                                                        console.log(data.email[0].primary)
                                                        primary = data.email[0].primary;
                                                        lastModified = new Date()
                                                        name.email.push({ primary, lastModified })
                                                        name.save(function(err) {
                                                            if (!err) {
                                                                console.log("email save")
                                                            } else {
                                                                console.log(err)
                                                            }
                                                        })
                                                    }
                                                    if (name.father[0].fatherFirstName != data.father[0].fatherFirstName && name.father[0].fatherMiddleName != data.father[0].fatherMiddleName && name.father[0].fatherLastName != data.father[0].fatherLastName && name.father[0].fatherEmail != data.father[0].fatherEmail) {
                                                        fatherFirstName = data.father[0].fatherFirstName;
                                                        fatherMiddleName = data.father[0].fatherMiddleName;
                                                        fatherLastName = data.father[0].fatherLastName;
                                                        fatherEmail = data.father[0].fatherEmail;
                                                        lastModified = new Date()
                                                        name.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail, lastModified })

                                                        name.save(function(err) {
                                                            if (!err) {
                                                                console.log("mother save")
                                                            }
                                                        })
                                                    }
                                                    if (name.organization[0].organizationPaperflowId != data.organization[0].organizationPaperflowId) {
                                                        console.log(name.organization[0].organizationPaperflowId)
                                                        console.log(data.organization[0].organizationPaperflowId)
                                                        org_info(data, pid).then(function(response) {
                                                            console.log("res", response)
                                                        }, function(response) {
                                                            console.log(response)
                                                        })
                                                    }


                                                }
                                            })
                                        } else {
                                            console.log("Student found by alternate email");
                                            var pid = mail.paperflowId;
                                            add_in_org(mail, pid).then(function(response) {
                                                console.log("res", response)
                                            }, function(response) {
                                                console.log(response)
                                            })


                                            if (mail.contactNumber[0].primary != data.contactNumber[0].primary) {
                                                primary = parseInt(data.contactNumber[0].primary);
                                                lastModified = new Date()
                                                mail.contactNumber.push({ primary, lastModified })
                                                mail.save(function(err) {
                                                    if (!err) {
                                                        console.log("number save")
                                                    }
                                                })
                                            }
                                            if (mail.email[0].primary != data.email[0].primary) {
                                                primary = data.email[0].primary;
                                                lastModified = new Date()
                                                mail.email.push({ primary, lastModified })
                                                mail.save(function(err) {
                                                    if (!err) {
                                                        console.log("email save")
                                                    }
                                                })
                                            }
                                            if (mail.father[0].fatherFirstName != data.father[0].fatherFirstName && mail.father[0].fatherMiddleName != data.father[0].fatherMiddleName && mail.father[0].fatherLastName != data.father[0].fatherLastName && mail.father[0].fatherEmail != data.father[0].fatherEmail) {
                                                fatherFirstName = data.father[0].fatherFirstName;
                                                fatherMiddleName = data.father[0].fatherMiddleName;
                                                fatherLastName = data.father[0].fatherLastName;
                                                fatherEmail = data.father[0].fatherEmail;
                                                lastModified = new Date()
                                                mail.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail, lastModified })

                                                mail.save(function(err) {
                                                    if (!err) {
                                                        console.log("father save")
                                                    }
                                                })
                                            }
                                            if (mail.mother[0].motherFirstName != data.mother[0].motherFirstName && mail.mother[0].motherMiddleName != data.mother[0].motherMiddleName && mail.mother[0].motherLastName != data.mother[0].motherLastName && mail.mother[0].motherEmail != data.mother[0].motherEmail) {
                                                motherFirstName = data.mother[0].motherFirstName;
                                                motherMiddleName = data.mother[0].motherMiddleName;
                                                motherLastName = data.mother[0].motherLastName;
                                                motherEmail = data.mother[0].motherEmail;
                                                lastModified = new Date()
                                                mail.mother.push({ motherFirstName, motherMiddleName, motherLastName, motherEmail, lastModified })

                                                mail.save(function(err) {
                                                    if (!err) {
                                                        console.log("mother save")
                                                    }
                                                })
                                            }
                                            if (mail.organization[0].organizationPaperflowId != data.organization[0].organizationPaperflowId) {
                                                org_info(data, pid).then(function(response) {
                                                    console.log("res", response)
                                                }, function(response) {
                                                    console.log(response)
                                                })
                                            }
                                        }

                                    })
                                } else {
                                    console.log("Student found by primary email.");

                                    var pid = pri.paperflowId;

                                    add_in_org(pri, pid).then(function(response) {
                                        console.log("res", response)
                                    }, function(response) {
                                        console.log(response)
                                    })



                                    if (pri.contactNumber[0].primary != data.contactNumber[0].primary) {
                                        // console.log(pri.contactNumber[0].primary)
                                        // console.log(data.contactNumber[0].primary)
                                        primary = parseInt(data.contactNumber[0].primary);
                                        lastModified = new Date()
                                        pri.contactNumber.push({ primary, lastModified })
                                        pri.save(function(err) {
                                            if (!err) {
                                                console.log("number save")
                                            }
                                        })
                                    }

                                    if (pri.father[0].fatherFirstName != data.father[0].fatherFirstName && pri.father[0].fatherMiddleName != data.father[0].fatherMiddleName && pri.father[0].fatherLastName != data.father[0].fatherLastName && pri.father[0].fatherEmail != data.father[0].fatherEmail) {
                                        fatherFirstName = data.father[0].fatherFirstName;
                                        fatherMiddleName = data.father[0].fatherMiddleName;
                                        fatherLastName = data.father[0].fatherLastName;
                                        fatherEmail = data.father[0].fatherEmail;
                                        lastModified = new Date()
                                        pri.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail, lastModified })

                                        pri.save(function(err) {
                                            if (!err) {
                                                console.log("father save")
                                            }
                                        })
                                    }
                                    if (pri.mother[0].motherFirstName != data.mother[0].motherFirstName && pri.mother[0].motherMiddleName != data.mother[0].motherMiddleName && pri.mother[0].motherLastName != data.mother[0].motherLastName && pri.mother[0].motherEmail != data.mother[0].motherEmail) {
                                        motherFirstName = data.mother[0].motherFirstName;
                                        motherMiddleName = data.mother[0].motherMiddleName;
                                        motherLastName = data.mother[0].motherLastName;
                                        motherEmail = data.mother[0].motherEmail;
                                        lastModified = new Date()
                                        pri.mother.push({ motherFirstName, motherMiddleName, motherLastName, motherEmail, lastModified })

                                        pri.save(function(err) {
                                            if (!err) {
                                                console.log("mother save")
                                            }
                                        })
                                    }
                                    if (pri.organization[0].organizationPaperflowId != data.organization[0].organizationPaperflowId) {

                                        org_info(data, pid).then(function(response) {
                                            console.log("res", response)
                                        }, function(response) {
                                            console.log(response)
                                        })

                                    }
                                } //else
                            }) //student

                    }) //temp
            } //function






        function org_info(data, pid) {
            //console.log("dat", data)
            return new Promise(function(resolve, reject) {
                Student.findOne({ $and: [{ "email.primary": data.email[0].primary }, { "organization.organizationPaperflowId": data.organization[0].organizationPaperflowId }] }, function(err, namee) {
                    if (namee == null) {
                        typeOfOrganization != data.organization[0].typeOfOrganization;
                        nameOfOrganization = data.organization[0].nameOfOrganization;
                        organizationPaperflowId = data.organization[0].organizationPaperflowId;
                        namee.organization.push({ typeOfOrganization, nameOfOrganization, organizationPaperflowId })
                        namee.save(function(err) {
                            if (!err) {
                                resolve("org save")
                            }
                        })
                    } else {
                        reject("org aleardy exit")
                    }
                })

            })
        }







        function add_in_org(data, pid) {
            //console.log("dat", data)
            return new Promise(function(resolve, reject) {



                if (data.organization[0].typeOfOrganization == "001" || data.organization[0].typeOfOrganization == "003") {
                    Training_com_Register.findOne({ $and: [{ "paperflowId": data.organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: pid } } }] }, function(err, dataa) {
                        if (dataa == null) {
                            Training_com_Register.findOne({ paperflowId: data.organization[0].organizationPaperflowId }, function(err, dat) {
                                dat.student.push(pid)
                                dat.save(function(err) {
                                    if (!err) {

                                        resolve('student not found')
                                    } else {
                                        reject("error1", err)
                                        console.log({ success: false, message: 'Invalid data' });
                                    }

                                })
                            })
                        } else {
                            resolve('student id found so not saved')
                        }

                    })
                } else if (data.organization[0].typeOfOrganization == "002") {
                    console.log("data", data)
                    Training_int_Register.findOne({ $and: [{ "paperflowId": data.organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: pid } } }] }, function(err, dataa) {

                        console.log("dataa", dataa)
                        if (dataa == null) {
                            Training_int_Register.findOne({ paperflowId: data.organization[0].organizationPaperflowId }, function(err, dat) {
                                //console.log("pid", pri.paperflowId)

                                dat.student.push(pid)
                                dat.save(function(err) {
                                    if (!err) {

                                        resolve('student not found')
                                    } else {
                                        reject(err)
                                        console.log({ success: false, message: 'Invalid data' });
                                    }

                                })
                            })
                        } else {
                            resolve('student id found so not saved')
                        }
                    })
                } else if (data.organization[0].typeOfOrganization == "004") {
                    SchoolRegister.findOne({ $and: [{ "paperflowId": data.organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: pri.paperflowId } } }] }, function(err, dataa) {

                        if (dataa == null) {
                            SchoolRegister.findOne({ paperflowId: data.organization[0].organizationPaperflowId }, function(err, dat) {

                                dat.student.push(pri.paperflowId)
                                dat.save(function(err) {
                                    if (!err) {

                                        resolve('student not found')
                                    } else {
                                        reject(err)
                                        console.log({ success: false, message: 'Invalid data' });
                                    }
                                })
                            })
                        } else {
                            resolve('student id found so not saved')
                        }
                    })
                }
            })
        } //function add_in_org

    } //exports
