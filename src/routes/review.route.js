const express=require('express');
const { auth } = require('../middleware/auth.middleware');
const {ReviewModel } = require('../models/review.model');

const reviewRoutes=express.Router();

//private routes who are authenticate

//read review
reviewRoutes.get('/',  async (req,res)=>{
    try{
        const review=await ReviewModel.find({userid:req.body.userid});
        if(review)
        res.send(review);
    else
        res.send("You haven't order any book from our shop");
    }
    catch(err){
        res.send("Some error occure");
    }
});

//create review
reviewRoutes.post('/',  async (req,res)=>{
  
    try{
        const review=await new ReviewModel(req.body);
        console.log(review);
        await review.save();
        res.send("Review successfully posted");
    }
    catch(err){
        res.send("Some error occure");
    }
});

//update review

reviewRoutes.patch('/:reviewid',  async (req,res)=>{
  
    try{
        const reviewid=req.params;
        const review=await ReviewModel.findByIdAndUpdate({_id:reviewid}, req.body);
        await review.save();
        res.send("review successfully updated");
    }
    catch(err){
        res.send("Some error occure");
    }
});



//delete review
reviewRoutes.delete('/:reviewid', auth, async (req,res)=>{
  
    try{
        const reviewid=req.params;
        const review=await ReviewModel.findByIdAndDelete({_id:reviewid});
        await review.save();
        res.send("review successfully deleted");
    }
    catch(err){
        res.send("Some error occure");
    }
});
module.exports={
    reviewRoutes
}
