const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendenceSchema = new Schema({
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
  stname:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  gender:{
    type: String,
    required: true
  },
  contactno:{
    type: String,
    required: true
  },
  parent:{
    type: String,
    required: true
  },
  school:{
    type: String,
    required: true
  }
})

const Attendence = mongoose.model("Attendence",attendenceSchema);
module.exports = Attendence;