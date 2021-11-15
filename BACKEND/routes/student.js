const studentRouter = require('express').Router();
const passportConfig = require('../passport');
const passport = require('passport');
const User = require('../models/User');
const Student = require('../models/Student');
const Class = require('../models/Class');
const { db } = require("../models/Student");

studentRouter.post('/addstudent',passport.authenticate('jwt',{session : false}),(req,res)=>{
  const {userId,userName,classId,classname,stname,contactno,parent,address,gender,school} = req.body;

  const newstudent = new Student({
    userId,
    userName,
    classId,
    classname,
    stname,
    address,
    parent,
    contactno,
    gender,
    school
  })

  newstudent.save().then(()=>{
    res.json("Student Added")
  }).catch((err)=>{
    console.log(err);
  })

});

studentRouter.get('/allstudents/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  Student.find({classId : req.params.id})
  .then((student)=>{
    res.json(student);
  })
  .catch((err)=>{
    console.log(err);
  })

});

studentRouter.delete('/deletestudent/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let classID = req.params.id;

  Student.findByIdAndDelete(classID)
  .then(()=>{
    res.status(200).send({ status: "Student deleted" });
  })
  .catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  });
});

studentRouter.delete('/deleteallstudent/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let userID = req.params.id;

  Class.findByIdAndDelete(userID)
  .then(()=>{
    res.status(200).send({ status: "Class deleted" });
  })
  Student.find({classId : req.params.id}).deleteMany()
  .then(()=>{
    res.status(200).send({ status: "Student deleted" });
  })
  .catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  });
});


studentRouter.put('/stdclsupdate/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let userID = req.params.id;


  const{userId,userName,classname,grade} = req.body;
  const {classId} = req.body;


  const updateClass = {
    userId,
    userName,
    classname,
    grade
  }

  const updateStudent = {
    userId,
    userName,
    classId,
    classname
  }
  // if(userId===req.user._id){
    Class.findByIdAndUpdate(userID,updateClass).then(() =>{
      res.status(200).send({status: "Class updated"})
  }).catch((err) =>{
    console.log(err);
    res.status(500).send({status: "Error with updating data",error: err.message})
});
  Student.find({classId : req.params.id}).updateMany(updateStudent)
  .then(()=>{
    res.status(200).send({status: "Student updated"})
  })
});

studentRouter.put('/studentupdate/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let stdID = req.params.id;

  

  const {stname,contactno,parent,address,gender,school} = req.body;

  const updateStudent = {
    stname,
    address,
    parent,
    contactno,
    gender,
    school
  }
  // if(userId===req.user._id){
    const update = Student.findByIdAndUpdate(stdID,updateStudent).then(() =>{
      res.status(200).send({status: "Student updated"})
  }).catch((err) =>{
      console.log(err);
      res.status(500).send({status: "Error with updating data",error: err.message})
  });
  // }
});

studentRouter.get('/getstudent/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let userID = req.params.id;
  // if(userId===req.user._id){
    Student.findById(userID).then((student)=>{
      res.status(200).send({status:"Student fetched", student});
  
  }).catch((e)=>{
      res.status(500).send({status:"Error"});
  })
  // }
});

// studentRouter.route("/attendance").get((req,res)=> {

//   Student.find().then((labourers)=>{
//       res.json(labourers)
//       db.collection("attendances").insertMany(labourers)
     
//   }).catch((err)=>{
//       console.log(err)
//   })
// })

studentRouter.get('/attendance/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  Student.find({classId : req.params.id})
  .then((student)=>{
    res.json(student);
    db.collection("attendences").insertMany(student)
  })
  .catch((err)=>{
    console.log(err);
  })

});

module.exports = studentRouter;