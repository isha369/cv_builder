var mongoose=require('mongoose');

var CollegeSchema=new mongoose.Schema({
    CollegeId : String,
    Title : String,
    CollegeName : String,
    Percentage : String,
    GraduationYear : String,
    UserId : Number
})


module.exports=mongoose.model('College',CollegeSchema);