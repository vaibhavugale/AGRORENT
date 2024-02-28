const mongoose = require('mongoose');

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
   history:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'History'
    
}],
    
});


module.exports = mongoose.model('History',historySchema);