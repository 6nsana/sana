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

        console.log("email", req.body.data[0].email[0].primary)
        console.log(req.body.data[0].organization[0].typeOfOrganization)
        console.log(req.body.data[0].organization[0].organizationPaperflowId)
        console.log("hi", req.body.data[0].firstName)
        console.log("hello", req.body.data[0].email[0].primary)
        console.log(req.body.data[0].dateOfBirth[0].dob)
        console.log(req.body.data[0].father[0].fatherFirstName)

        student = new Student()

        
         

         typeOfOrganization = req.body.data[0].organization[0].typeOfOrganization
         nameOfOrganization = req.body.data[0].organization[0].nameOfOrganization
        organizationPaperflowId = req.body.data[0].organization[0].organizationPaperflowId
        student.organization.push({ typeOfOrganization, nameOfOrganization, organizationPaperflowId})


        student.firstName = req.body.data[0].firstName;
        student.middleName = req.body.data[0].middleName;
        student.lastName = req.body.data[0].lastName;
        dob = req.body.data[0].dateOfBirth[0].dob;
        student.dateOfBirth.push({ dob })

        student.gender = req.body.data[0].gender;
        student.nationality = '1'
        fatherFirstName = req.body.data[0].father[0].fatherFirstName;
        fatherMiddleName = req.body.data[0].father[0].fatherMiddleName;
        fatherLastName = req.body.data[0].father[0].fatherLastName;
        fatherEmail = req.body.data[0].father[0].fatherEmail;
        student.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail })

        motherFirstName = req.body.data[0].mother[0].motherFirstName;
        motherMiddleName = req.body.data[0].mother[0].motherMiddleName;
        motherLastName = req.body.data[0].mother[0].motherLastName;
        motherEmail = req.body.data[0].mother[0].motherEmail;
        student.mother.push({ motherFirstName, motherMiddleName, motherLastName, motherEmail })


        primary = parseInt(req.body.data[0].contactNumber[0].primary);

        lastModified = new Date()
        student.contactNumber.push({ primary, lastModified })

        primary = req.body.data[0].email[0].primary;

        student.email.push({ primary })


        Student.findOne({ "email.primary": req.body.data[0].email[0].primary }, function(err, pri) {
                console.log("pri", pri)

                if (pri == null || pri == undefined || pri == '') {
                    Student.findOne({ "email.alternate": req.body.data[0].email[0].primary }, function(err, mail) {
                        console.log("alter", mail)
                        if (mail == null || mail == undefined || mail == '') {
                            Student.findOne({ $and: [{ firstName: req.body.data[0].firstName }, { "mother.motherFirstName": req.body.data[0].mother.motherFirstName }, { "dateOfBirth.dob": req.body.data[0].dateOfBirth[0].dob }] }, function(err, name) {
                                console.log("name", name)
                                if (name == null || name == undefined || name == '') {
                                student.paperflowId = "ST" + req.body.data[0].firstName + req.body.data[0].mother[0].motherFirstName + req.body.data[0].dateOfBirth[0].dob
                                    var pid=student.paperflowId
                                    console.log(pid)
                                    student.save(function(err) {
                                        if (!err) {
                                            console.log('save')
                                        } else {
                                            console.log("error", err)
                                        }
                                    })

                                    if (req.body.data[0].organization[0].typeOfOrganization == 1 || req.body.data[0].organization[0].typeOfOrganization == 3) {
                                        console.log(paperflowId)
                                        Training_com_Register.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: pid } } }] }, function(err, dataa) {


                                            if (dataa == null) {
                                                Training_com_Register.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {
                                                    dat.student.push(pid)
                                                    dat.save(function(err) {
                                                        if (!err) {

                                                            console.log('student not found')
                                                        } else {
                                                            console.log("error1", err)
                                                            res.json({ success: false, message: 'Invalid data' });
                                                        }

                                                    })
                                                })
                                            } else {
                                                console.log('student id found so not saved')
                                            }

                                        })
                                    } else if (req.body.data[0].organization[0].typeOfOrganization == 2) {
                                        //console.log(paperflowId)
                                        Training_int_Register.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: pid } } }] }, function(err, dataa) {

                                            console.log("dataa", dataa)
                                            if (dataa == null) {
                                                Training_int_Register.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {
                                                    console.log("pid", pid)
                                                    dat.student.push(pid)
                                                    dat.save(function(err) {
                                                        if (!err) {

                                                            console.log('student not found')
                                                        } else {
                                                            console.log(err)
                                                            res.json({ success: false, message: 'Invalid data' });
                                                        }

                                                    })
                                                })
                                            } else {
                                                console.log('student id found so not saved')
                                            }
                                        })
                                    } else if (req.body.data[0].organization[0].typeOfOrganization == 4) {
                                        SchoolRegister.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: pid } } }] }, function(err, dataa) {

                                            if (dataa == null) {
                                                SchoolRegister.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {

                                                    dataa.student.push(pid)
                                                    dataa.save(function(err) {
                                                        if (!err) {

                                                            console.log('student not found')
                                                        } else {
                                                            console.log(err)
                                                            res.json({ success: false, message: 'Invalid data' });
                                                        }
                                                    })
                                                })
                                            } else {
                                                console.log('student id found so not saved')
                                            }
                                        })
                                    }


                                } //if of studentent name
                                else {
                                    var pid = name.paperflowId;
                                    console.log("Student found by name");
                                    if (name.contactNumber[0].primary != req.body.data[0].contactNumber[0].primary) {
                                        primary = parseInt(req.body.data[0].contactNumber[0].primary);
                                        lastModified = new Date()
                                        name.contactNumber.push({ primary, lastModified })
                                        name.save(function(err) {
                                            if (!err) {
                                                console.log("number save")
                                            }
                                        })
                                    }
                                    if (name.email[0].primary != req.body.data[0].email[0].primary) {
                                        primary = req.body.data[0].email[0].primary;
                                        lastModified = new Date()
                                        name.contactNumber.push({ primary, lastModified })
                                        name.save(function(err) {
                                            if (!err) {
                                                console.log("email save")
                                            }
                                        })
                                    }
                                    if (name.father[0].fatherFirstName != req.body.data[0].father[0].fatherFirstName && name.father[0].fatherMiddleName != req.body.data[0].father[0].fatherMiddleName && name.father[0].fatherLastName != req.body.data[0].father[0].fatherLastName && name.father[0].fatherEmail != req.body.data[0].father[0].fatherEmail) {
                                        fatherFirstName = req.body.data[0].father[0].fatherFirstName;
                                        fatherMiddleName = req.body.data[0].father[0].fatherMiddleName;
                                        fatherLastName = req.body.data[0].father[0].fatherLastName;
                                        fatherEmail = req.body.data[0].father[0].fatherEmail;
                                        lastModified = new Date()
                                        name.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail, lastModified })

                                        name.save(function(err) {
                                            if (!err) {
                                                console.log("father save")
                                            }
                                        })
                                    }
                                    if (name.organization[0].organizationPaperflowId = req.body.data[0].organization[0].organizationPaperflowId) {
                                        typeOfOrganization != req.body.data[0].organization[0].typeOfOrganization;
                                        nameOfOrganization = req.body.data[0].organization[0].nameOfOrganization;
                                        organizationPaperflowId = req.body.data[0].organization[0].organizationPaperflowId;
                                        name.organization.push({ typeOfOrganization, nameOfOrganization, organizationPaperflowId })
                                        name.save(function(err) {
                                            if (!err) {
                                                console.log("father save")
                                            }
                                        })
                                    }


                                    if (req.body.data[0].organization[0].typeOfOrganization == 1 || req.body.data[0].organization[0].typeOfOrganization == 3) {
                                        Training_com_Register.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: name.paperflowId } } }] }, function(err, dataa) {


                                            if (dataa == null) {
                                                Training_com_Register.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {
                                                    dat.student.push(name.paperflowId)
                                                    dat.save(function(err) {
                                                        if (!err) {

                                                            console.log('student not found')
                                                        } else {
                                                            console.log("error1", err)
                                                            res.json({ success: false, message: 'Invalid data' });
                                                        }

                                                    })
                                                })
                                            } else {
                                                console.log('student id found so not saved')
                                            }

                                        })
                                    } else if (req.body.data[0].organization[0].typeOfOrganization == 2) {
                                        Training_int_Register.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: name.paperflowId } } }] }, function(err, dataa) {

                                            console.log("dataa", dataa)
                                            if (dataa == null) {
                                                Training_int_Register.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {
                                                    console.log("pid", name.paperflowId)
                                                    dat.student.push(name.paperflowId)
                                                    dat.save(function(err) {
                                                        if (!err) {

                                                            console.log('student not found')
                                                        } else {
                                                            console.log(err)
                                                            res.json({ success: false, message: 'Invalid data' });
                                                        }

                                                    })
                                                })
                                            } else {
                                                console.log('student id found so not saved')
                                            }
                                        })
                                    } else if (req.body.data[0].organization[0].typeOfOrganization == 4) {
                                        SchoolRegister.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: name.paperflowId } } }] }, function(err, dataa) {

                                            if (dataa == null) {
                                                SchoolRegister.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {

                                                    dataa.student.push(name.paperflowId)
                                                    dataa.save(function(err) {
                                                        if (!err) {

                                                            console.log('student not found')
                                                        } else {
                                                            console.log(err)
                                                            res.json({ success: false, message: 'Invalid data' });
                                                        }
                                                    })
                                                })
                                            } else {
                                                console.log('student id found so not saved')
                                            }
                                        })
                                    }

                                }
                            })
                        } else {
                            var pid = mail.paperflowId;
                            console.log("Student found by alternate email");
                            if (mail.contactNumber[0].primary != req.body.data[0].contactNumber[0].primary) {
                                primary = parseInt(req.body.data[0].contactNumber[0].primary);
                                lastModified = new Date()
                                mail.contactNumber.push({ primary, lastModified })
                                mail.save(function(err) {
                                    if (!err) {
                                        console.log("number save")
                                    }
                                })
                            }
                            if (mail.email[0].primary != req.body.data[0].email[0].primary) {
                                primary = req.body.data[0].email[0].primary;
                                lastModified = new Date()
                                mail.contactNumber.push({ primary, lastModified })
                                mail.save(function(err) {
                                    if (!err) {
                                        console.log("email save")
                                    }
                                })
                            }
                            if (mail.father[0].fatherFirstName != req.body.data[0].father[0].fatherFirstName && mail.father[0].fatherMiddleName != req.body.data[0].father[0].fatherMiddleName && mail.father[0].fatherLastName != req.body.data[0].father[0].fatherLastName && mail.father[0].fatherEmail != req.body.data[0].father[0].fatherEmail) {
                                fatherFirstName = req.body.data[0].father[0].fatherFirstName;
                                fatherMiddleName = req.body.data[0].father[0].fatherMiddleName;
                                fatherLastName = req.body.data[0].father[0].fatherLastName;
                                fatherEmail = req.body.data[0].father[0].fatherEmail;
                                lastModified = new Date()
                                mail.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail, lastModified })

                                mail.save(function(err) {
                                    if (!err) {
                                        console.log("father save")
                                    }
                                })
                            }
                            if (mail.mother[0].motherFirstName != req.body.data[0].mother[0].motherFirstName && mail.mother[0].motherMiddleName != req.body.data[0].mother[0].motherMiddleName && mail.mother[0].motherLastName != req.body.data[0].mother[0].motherLastName && mail.mother[0].motherEmail != req.body.data[0].mother[0].motherEmail) {
                                motherFirstName = req.body.data[0].father[0].motherFirstName;
                                motherMiddleName = req.body.data[0].father[0].motherMiddleName;
                                motherLastName = req.body.data[0].father[0].motherLastName;
                                motherEmail = req.body.data[0].father[0].motherEmail;
                                lastModified = new Date()
                                mail.mother.push({ motherFirstName, motherMiddleName, motherLastName, motherEmail, lastModified })

                                mail.save(function(err) {
                                    if (!err) {
                                        console.log("father save")
                                    }
                                })
                            }
                            if (mail.organization[0].organizationPaperflowId = req.body.data[0].organization[0].organizationPaperflowId) {
                                typeOfOrganization != req.body.data[0].organization[0].typeOfOrganization;
                                nameOfOrganization = req.body.data[0].organization[0].nameOfOrganization;
                                organizationPaperflowId = req.body.data[0].organization[0].organizationPaperflowId;
                                mail.organization.push({ typeOfOrganization, nameOfOrganization, organizationPaperflowId })
                                mail.save(function(err) {
                                    if (!err) {
                                        console.log("father save")
                                    }
                                })
                            }




                            if (req.body.data[0].organization[0].typeOfOrganization == 1 || req.body.data[0].organization[0].typeOfOrganization == 3) {
                                Training_com_Register.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: mail.paperflowId } } }] }, function(err, dataa) {


                                    if (dataa == null) {
                                        Training_com_Register.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {
                                            dat.student.push(mail.paperflowId)
                                            dat.save(function(err) {
                                                if (!err) {

                                                    console.log('student not found')
                                                } else {
                                                    console.log("error1", err)
                                                    res.json({ success: false, message: 'Invalid data' });
                                                }

                                            })
                                        })
                                    } else {
                                        console.log('student id found so not saved')
                                    }

                                })
                            } else if (req.body.data[0].organization[0].typeOfOrganization == 2) {
                                Training_int_Register.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: mail.paperflowId } } }] }, function(err, dataa) {

                                    console.log("dataa", dataa)
                                    if (dataa == null) {
                                        Training_int_Register.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {
                                            console.log("pid", paperflowId)
                                            dat.student.push(mail.paperflowId)
                                            dat.save(function(err) {
                                                if (!err) {

                                                    console.log('student not found')
                                                } else {
                                                    console.log(err)
                                                    res.json({ success: false, message: 'Invalid data' });
                                                }

                                            })
                                        })
                                    } else {
                                        console.log('student id found so not saved')
                                    }
                                })
                            } else if (req.body.data[0].organization[0].typeOfOrganization == 4) {
                                SchoolRegister.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: mail.paperflowId } } }] }, function(err, dataa) {

                                    if (dataa == null) {
                                        SchoolRegister.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {

                                            dataa.student.push(mail.paperflowId)
                                            dataa.save(function(err) {
                                                if (!err) {

                                                    console.log('student not found')
                                                } else {
                                                    console.log(err)
                                                    res.json({ success: false, message: 'Invalid data' });
                                                }
                                            })
                                        })
                                    } else {
                                        console.log('student id found so not saved')
                                    }
                                })
                            }

                        }

                    })
                } else {
                    var pid = pri.paperflowId;
                    console.log(pid)
                    console.log("Student found by primary email.");
                    if (pri.contactNumber[0].primary != req.body.data[0].contactNumber[0].primary) {
                        primary = parseInt(req.body.data[0].contactNumber[0].primary);
                        lastModified = new Date()
                        pri.contactNumber.push({ primary, lastModified })
                        pri.save(function(err) {
                            if (!err) {
                                console.log("number save")
                            }
                        })
                    }
                    if (pri.email[0].primary != req.body.data[0].email[0].primary) {
                        primary = req.body.data[0].email[0].primary;
                        lastModified = new Date()
                        pri.contactNumber.push({ primary, lastModified })
                        pri.save(function(err) {
                            if (!err) {
                                console.log("email save")
                            }
                        })
                    }
                    if (pri.father[0].fatherFirstName != req.body.data[0].father[0].fatherFirstName && pri.father[0].fatherMiddleName != req.body.data[0].father[0].fatherMiddleName && pri.father[0].fatherLastName != req.body.data[0].father[0].fatherLastName && pri.father[0].fatherEmail != req.body.data[0].father[0].fatherEmail) {
                        fatherFirstName = req.body.data[0].father[0].fatherFirstName;
                        fatherMiddleName = req.body.data[0].father[0].fatherMiddleName;
                        fatherLastName = req.body.data[0].father[0].fatherLastName;
                        fatherEmail = req.body.data[0].father[0].fatherEmail;
                        lastModified = new Date()
                        pri.father.push({ fatherFirstName, fatherMiddleName, fatherLastName, fatherEmail, lastModified })

                        pri.save(function(err) {
                            if (!err) {
                                console.log("father save")
                            }
                        })
                    }
                    if (pri.mother[0].motherFirstName != req.body.data[0].mother[0].motherFirstName && pri.mother[0].motherMiddleName != req.body.data[0].mother[0].motherMiddleName && pri.mother[0].motherLastName != req.body.data[0].mother[0].motherLastName && pri.mother[0].motherEmail != req.body.data[0].mother[0].motherEmail) {
                        motherFirstName = req.body.data[0].father[0].motherFirstName;
                        motherMiddleName = req.body.data[0].father[0].motherMiddleName;
                        motherLastName = req.body.data[0].father[0].motherLastName;
                        motherEmail = req.body.data[0].father[0].motherEmail;
                        lastModified = new Date()
                        pri.mother.push({ motherFirstName, motherMiddleName, motherLastName, motherEmail, lastModified })

                        pri.save(function(err) {
                            if (!err) {
                                console.log("father save")
                            }
                        })
                    }
                    if (pri.organization[0].organizationPaperflowId = req.body.data[0].organization[0].organizationPaperflowId) {
                        typeOfOrganization != req.body.data[0].organization[0].typeOfOrganization;
                        nameOfOrganization = req.body.data[0].organization[0].nameOfOrganization;
                        organizationPaperflowId = req.body.data[0].organization[0].organizationPaperflowId;
                        pri.organization.push({ typeOfOrganization, nameOfOrganization, organizationPaperflowId })
                        pri.save(function(err) {
                            if (!err) {
                                console.log("father save")
                            }
                        })
                    }



                    if (req.body.data[0].organization[0].typeOfOrganization == 1 || req.body.data[0].organization[0].typeOfOrganization == 3) {
                        Training_com_Register.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: pid } } }] }, function(err, dataa) {


                            if (dataa == null) {
                                Training_com_Register.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {
                                    dat.student.push(pid)
                                    dat.save(function(err) {
                                        if (!err) {

                                            console.log('student not found')
                                        } else {
                                            console.log("error1", err)
                                            res.json({ success: false, message: 'Invalid data' });
                                        }

                                    })
                                })
                            } else {
                                console.log('student id found so not saved')
                            }

                        })
                    } else if (req.body.data[0].organization[0].typeOfOrganization == 2) {
                        Training_int_Register.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: pid } } }] }, function(err, dataa) {

                            console.log("dataa", dataa)
                            if (dataa == null) {
                                Training_int_Register.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {
                                    console.log("pid", pri.paperflowId)
                                    
                                    dat.student.push(pid)
                                    dat.save(function(err) {
                                        if (!err) {

                                            console.log('student not found')
                                        } else {
                                            console.log(err)
                                            res.json({ success: false, message: 'Invalid data' });
                                        }

                                    })
                                })
                            } else {
                                console.log('student id found so not saved')
                            }
                        })
                    } else if (req.body.data[0].organization[0].typeOfOrganization == 4) {
                        SchoolRegister.findOne({ $and: [{ "paperflowId": req.body.data[0].organization[0].organizationPaperflowId }, { "student": { $elemMatch: { $eq: pri.paperflowId } } }] }, function(err, dataa) {

                            if (dataa == null) {
                                SchoolRegister.findOne({ paperflowId: req.body.data[0].organization[0].organizationPaperflowId }, function(err, dat) {

                                    dataa.student.push(pri.paperflowId)
                                    dataa.save(function(err) {
                                        if (!err) {

                                            console.log('student not found')
                                        } else {
                                            console.log(err)
                                            res.json({ success: false, message: 'Invalid data' });
                                        }
                                    })
                                })
                            } else {
                                console.log('student id found so not saved')
                            }
                        })
                    }
                } //else
            }) //temp for each function
    } //exports
