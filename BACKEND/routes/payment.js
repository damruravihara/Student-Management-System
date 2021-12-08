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

paymentRouter.delete('/deletepayment/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let userID = req.params.id;

  Payment.findByIdAndDelete(userID)
  .then(()=>{
    res.status(200).send({ status: "Payment deleted" });
  })
  .catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  });
}); 

paymentRouter.delete('/deleteallpayment/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let userId = req.params.id;

  Payment.find({stdId : req.params.id}).deleteMany().then(()=>{
    res.status(200).send({ status: "All Payments deleted" });
  }).catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  }); 
});

paymentRouter.delete('/deleteuserpayment/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{

  Payment.find({userId : req.params.id}).deleteMany().then(()=>{
    res.status(200).send({ status: "All Payments deleted" });
  }).catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  }); 
});

module.exports = paymentRouter;