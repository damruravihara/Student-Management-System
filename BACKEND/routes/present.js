const presentRouter = require('express').Router();
const passport = require('passport');
const passportConfig = require('../passport');
const Present = require('../models/Present');

presentRouter.post('/addpresent',passport.authenticate('jwt',{session : false}),(req,res)=>{
  const {userId,userName,classId,classname,stdId,stname,currentDate} = req.body;

  const newpresent = new Present({
    userId,
    userName,
    classId,
    classname,
    stdId,
    stname,
    currentDate
  })

  newpresent.save().then(()=>{
    res.json("Attendence Added")
  }).catch((err)=>{
    console.log(err);
  })

});

presentRouter.get('/allpresent/:id/:date',passport.authenticate('jwt',{session : false}),(req,res)=>{
  Present.find({classId : req.params.id}&&{currentDate : req.params.date})
  .then((present)=>{
    res.json(present);
  })
  .catch((err)=>{
    console.log(err);
  })

});

module.exports=presentRouter;