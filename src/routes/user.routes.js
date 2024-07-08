const express=require('express');
const { UserModel } = require('../models/user.model');
const bcrypt=require('bcrypt');
const userRouter=express.Router();
const jwt=require('jsonwebtoken');


//sign up functionality 
userRouter.post('/register', async (req,res)=>{
    try{
        const {username, email, password, role}=req.body;
        const isUserExists=await UserModel.findOne({email});
        console.log(isUserExists);
        if(!isUserExists)
        {
            bcrypt.hash(password, 5, async (err,hashPass)=>{
                if(err)
                   return res.send("Not able encrypt your password, Please try again");
                else
                {
                    const newuser=await new UserModel({username,email,role,password:hashPass});
                    newuser.save();
                    res.send("Registration successful");
                }
            })
        }
        else
        res.send("You are already registered! Please login");

    }
    catch(err){
        res.send("Some error occure! Please try again");
    }
})


//login functionality
userRouter.post('/login', async (req,res)=>{
    try{
        const {email, password}=req.body;
        const user=await UserModel.findOne({email});
       console.log(user);
        if(user)
        {
            bcrypt.compare(password, user.password, async (err,result)=>{
                if(err)
                   return res.send("Please enter correct password");
                else
                {
                    const token=jwt.sign({userid:user._id, username:user.username}, process.env.SECRET_KEY);
                    res.json({msg:"Login successful", token:token});
                }
            })
        }
        else
        res.send("You are not registered user! Please register");

    }
    catch(err){
        res.send("Some error occure! Please try again");
    }
})

module.exports={
    userRouter
}