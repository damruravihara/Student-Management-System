const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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

const Student = mongoose.model("Student",studentSchema);
module.exports = Student;