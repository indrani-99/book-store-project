const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String}
}, {versionKey:false})

const UserModel=mongoose.model('User',userSchema );

module.exports={UserModel};