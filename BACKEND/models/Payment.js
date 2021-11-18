const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  userId:{
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
  },
  month:{
    type:String,
    required: true
  },
  note:{
    type:String,
    default: 'Date.now'
  }
});

const Payment= mongoose.model("Payment",paymentSchema);
module.exports = Payment;