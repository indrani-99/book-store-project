const mongoose=require('mongoose');

const reviewSchema=mongoose.Schema({
    bookid:{type:String, required:true},
    rating:{type:Number, require:true},
    description:{type:Number, require:true}
}, {versionKey:false})

const ReviewModel=mongoose.model('Review',reviewSchema );

module.exports={ReviewModel};