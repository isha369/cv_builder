var mongoose=require('mongoose');

var WorkSchema=new mongoose.Schema({
    UserId : Number,
   WorkId : Number,
   Designation : String,
   Duration : String,
   Company : String, 
   Experience: String
})


module.exports=mongoose.model('Work',WorkSchema);