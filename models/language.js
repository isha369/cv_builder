var mongoose=require('mongoose');

var LanguageSchema=new mongoose.Schema({
    UserId : Number,
   Language : String
})



var Language=mongoose.model('Language',LanguageSchema);

module.exports=Language;