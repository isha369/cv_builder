var mongoose=require('mongoose');

var CertificationSchema=new mongoose.Schema({
    UserId : Number,
   Certification : String
})


module.exports=mongoose.model('Certification',CertificationSchema);