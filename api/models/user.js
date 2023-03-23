const mongoose=require('mongoose')

const RegSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    conpass:String
})




module.exports=mongoose.model('singuplogin',RegSchema)