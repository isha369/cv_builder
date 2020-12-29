var mongoose=require('mongoose');

var UserProfileSchema=new mongoose.Schema({
    UserId : Number,
    Name : String,
    Username: String,
    Email : String,
    No : Number,
    Address : String,
    ResumeSummary : String
})


module.exports=mongoose.model('UserProfile',UserProfileSchema);