var mongoose=require('mongoose');

var TechnicalSkillSchema=new mongoose.Schema({
    UserId : Number,
   TechnicalSkill : String
})


module.exports=mongoose.model('TechnicalSkill',TechnicalSkillSchema);