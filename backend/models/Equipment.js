const mongoose = require('mongoose');
const User = require('./User');

const equipmentSchema = new mongoose.Schema({
      name:{
        type:String,
        require:true,
        default:""
      },
      type:{
        type:String,
        require:true,
        default:""
      },
      manufacturer:{
        type:String,
        require:true
      },
      model:{
        type:String,
        default:false,
        default:""
      },
      year:{
        type:String,
        require:true
      },
      capacity:{
        type:String,

      },
      
      image:{
        type:String,

      },
      rate:{
        type:String,
        require:true
      },
      owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true, 
    
      },
      available:{
        type:Boolean,
       default: true,
      
      },
      features:{
        type:String,
        default:""
      },
      history:[

      ]
})

module.exports = mongoose.model('Equipment',equipmentSchema);