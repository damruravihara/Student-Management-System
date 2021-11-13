const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  userId:{
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true
  },
  classname:{
    type: String,
    required: true
  },
  grade:{
    type: String,
    required: true
  }
})

const Class = mongoose.model("Class",classSchema);
module.exports = Class;