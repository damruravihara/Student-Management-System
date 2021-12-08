const classRouter = require('express').Router();
const passport = require('passport');
const passportConfig = require('../passport');
const Class = require('../models/Class');
const User = require('../models/User');

classRouter.post('/createclass',passport.authenticate('jwt',{session : false}),(req,res)=>{
  const {userId,userName,classname,grade} = req.body;

  const newclass = new Class({
    userId,
    userName,
    classname,
    grade
  })

  newclass.save().then(()=>{
    res.json("Classroom Created")
  }).catch((err)=>{
    console.log(err);
  })

});

classRouter.get('/allclasses',passport.authenticate('jwt',{session : false}),(req,res)=>{
  Class.find({userId : req.user._id})
  .then((classroom)=>{
    res.json(classroom);
  })
  .catch((err)=>{
    console.log(err);
  })

});

classRouter.delete('/deleteclass/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let userID = req.params.id;

  Class.findByIdAndDelete(userID)
  .then(()=>{
    res.status(200).send({ status: "Class deleted" });
  })
  .catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  });
});


classRouter.put('/classupdate/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let userID = req.params.id;

  

  const{userId,userName,classname,grade} = req.body;

  const updateClass = {
    userId,
    userName,
    classname,
    grade
  }
  // if(userId===req.user._id){
    const update = Class.findByIdAndUpdate(userID,updateClass).then(() =>{
      res.status(200).send({status: "User updated"})
  }).catch((err) =>{
      console.log(err);
      res.status(500).send({status: "Error with updating data",error: err.message})
  });
  // }
});

classRouter.get('/getclass/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let userID = req.params.id;
  // if(userId===req.user._id){
    Class.findById(userID).then((classroom)=>{
      res.status(200).send({status:"Class fetched", classroom});
  
  }).catch((e)=>{
      res.status(500).send({status:"Error"});
  })
  // }
});

// classRouter.route("/classupdate/:id").put(async (req,res) =>{
//   let number = req.params.id;
//   const{userId,userName,classname,grade} = req.body;

//   const updateClass = {
//     userId,
//     userName,
//     classname,
//     grade
//   }

//   const update = await Class.findByIdAndUpdate(number,updateClass).then(() =>{
//       res.status(200).send({status: "Class updated"})
//   }).catch((err) =>{
//       console.log(err);
//       res.status(500).send({status: "Error with updating data",error: err.message})
//   });
  
// })

// classRouter.route("/getclass/:id").get(async(req,res)=>{
//   const id = req.params.id;

//  await Class.findById(id).then((classroom)=>{
//       res.status(200).send({status:"Class fetched", classroom});
  
//   }).catch((e)=>{
//       res.status(500).send({status:"Error"});
//   })

// })

// userRouter.route("/getclass/:id").get(async(req,res)=>{
//   let classID = req.params.id;
//   await Class.findById(classID)
//   .then((classroom)=>{
//     res.status(200).send({ status:"My Class Fetched", classroom});
//   })
//   .catch(()=>{
//     console.log(err.message);
//     res.status(500).send({ status: "Error with get user", error: err.message });
//   });
// });

classRouter.delete('/deleteuserclass/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{

  Class.find({userId : req.params.id}).deleteMany().then(()=>{
    res.status(200).send({ status: "All Absent deleted" });
  }).catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  }); 
});


module.exports = classRouter;