const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presentSchema = new Schema({
  userId:{
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true
  },
  classId:{
    type: String,
    required: true
  },
  classname:{
    type: String,
    required: true
  },
  stdId:{
    type: String,
    required: true
  },
  stname:{
    type: String,
    required: true
  },
  currentDate:{
      type:String,
      required: true
  }
})

const Present = mongoose.model("Present",presentSchema);
module.exports = Present;