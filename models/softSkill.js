var mongoose=require('mongoose');

var SoftSkillSchema=new mongoose.Schema({
    UserId : Number,
   SoftSkill : String
})


module.exports=mongoose.model('SoftSkill',SoftSkillSchema);