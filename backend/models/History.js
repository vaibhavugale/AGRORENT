const mongoose = require('mongoose');
const User = require("../models/User")
const Equipment = require("../models/Equipment")
const historySchema = new mongoose.Schema({
   customerID:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'User',
   },
   eupId :{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'Equipment',
   },
   inProgress:{
    type:Boolean,
    default:true,
   }
    
});


module.exports = mongoose.model('History',historySchema);