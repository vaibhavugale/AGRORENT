const mongoose = require('mongoose');
const Equipment = require('./Equipment');
const History = require("./History")

const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    token:{
        type:String
    },
    image:{
        type:String
    },
    equipments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Equipment'
        
    }],
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    gender:{
        type:String
    },
    DOB:{
        type:String
    },
    address:{
       type:Object
    },
    history:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'History'
        
    }],

    
});


module.exports = mongoose.model('User',userSchema);