var mongoose=require('mongoose');

var ProjectSchema=new mongoose.Schema({
    UserId : Number,
    ProjectName: String,
    ProjectDescription : String
})


module.exports=mongoose.model('Project',ProjectSchema);