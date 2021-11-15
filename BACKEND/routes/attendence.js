const attendenceRouter = require('express').Router();
const passport = require('passport');
const passportConfig = require('../passport');
const Attendence = require('../models/Attendence');

attendenceRouter.get('/oneattendence/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let userID = req.params.id;
  // if(userId===req.user._id){
    Attendence.findById(userID).then((attendence)=>{
      res.status(200).send({status:"Attendence fetched", attendence});
  
  }).catch((e)=>{
      res.status(500).send({status:"Error"});
  })
  // }
});

attendenceRouter.get('/getattendence/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  Attendence.find({classId : req.params.id})
  .then((attendence)=>{
    res.json(attendence);
  })
  .catch((err)=>{
    console.log(err);
  })

});


attendenceRouter.delete('/deleteattendence/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let classID = req.params.id;

  Attendence.findByIdAndDelete(classID)
  .then(()=>{
    res.status(200).send({ status: "Attendence deleted" });
  })
  .catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  });
});

module.exports = attendenceRouter;