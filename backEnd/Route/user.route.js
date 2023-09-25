
const express=require("express");
const UserModel = require("../Model/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userRoute=express.Router();

userRoute.post("/register",async(req,res)=>{
     const {name,email,gender,password}=req.body;
     try {
         bcrypt.hash(password,5,async(err,hash)=>{
             if(err){
                res.status(400).send({"msg":err.message})
             }else{
                const user= new UserModel({name,email,gender,password:hash});
                await user.save();
                res.status(200).send({"msg":"new user registerd successful"})
             }
         })
       
     } catch (error) {
        res.status(400).send({"msg":error.message})
     }
})

userRoute.post("/login",async(req,res)=>{
  const {email,password}=req.body;
   const user=await UserModel.findOne({email});

   if(user){
     const token=jwt.sign({userID:user._id},"masai");
     res.status(200).send({"msg":"login succefull",token})
   }else{
      res.status(400).send({"msg":"invalid email ID"})
   }
})

module.exports=userRoute;
