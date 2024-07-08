const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    title:{type:String, required:true},
    author:{type:String, required:true},
    category:{type:String, required:true},
    price:{type:String, require:true}
}, {versionKey:false})

const BookModel=mongoose.model('Book',bookSchema );

module.exports={BookModel};