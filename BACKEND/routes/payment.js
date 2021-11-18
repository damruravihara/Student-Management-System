const paymentRouter = require('express').Router();
const passport = require('passport');
const passportConfig = require('../passport');
const Payment = require('../models/Payment');

paymentRouter.post('/addpayment',passport.authenticate('jwt',{session : false}),(req,res)=>{
  const {userId,classId,classname,stdId,stname,currentDate,month,note} = req.body;

  const newpayment = new Payment({
    userId,
    classId,
    classname,
    stdId,
    stname,
    currentDate,
    month,
    note
  })

  newpayment.save().then(()=>{
    res.json("Payment Added")
  }).catch((err)=>{
    console.log(err);
  })

});

paymentRouter.get('/allpayment/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  Payment.find({stdId : req.params.id})
  .then((payment)=>{
    res.json(payment);
  })
  .catch((err)=>{
    console.log(err);
  })

});

module.exports = paymentRouter;