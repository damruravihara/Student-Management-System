const absentRouter = require('express').Router();
const passport = require('passport');
const passportConfig = require('../passport');
const Absent = require('../models/Absent');

absentRouter.post('/addabsent',passport.authenticate('jwt',{session : false}),(req,res)=>{
  const {userId,userName,classId,classname,stdId,stname,currentDate} = req.body;

  const newabsent = new Absent({
    userId,
    userName,
    classId,
    classname,
    stdId,
    stname,
    currentDate
  })

  newabsent.save().then(()=>{
    res.json("Attendence Added")
  }).catch((err)=>{
    console.log(err);
  })

});

absentRouter.get('/allabsent/:id/:date',passport.authenticate('jwt',{session : false}),(req,res)=>{
  Absent.find({classId : req.params.id}&&{currentDate : req.params.date})
  .then((attendence)=>{
    res.json(attendence);
  })
  .catch((err)=>{
    console.log(err);
  })

});

absentRouter.delete('/deleteuserabsent/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{

  Absent.find({userId : req.params.id}).deleteMany().then(()=>{
    res.status(200).send({ status: "All Absent deleted" });
  }).catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  }); 
});

module.exports= absentRouter;