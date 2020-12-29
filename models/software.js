var mongoose=require('mongoose');

var SoftwareSchema=new mongoose.Schema({
    UserId : Number,
   Software : String
})


module.exports=mongoose.model('Software',SoftwareSchema);