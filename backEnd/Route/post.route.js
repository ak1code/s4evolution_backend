const express=require("express");
const PostModel = require("../Model/postModel");
const auth=require("../Middleware/authMiddleware");
const postRoute=express.Router();

postRoute.post("/add",auth,async(req,res)=>{
    const payload=req.body;

    try {
        const post=new PostModel(payload);
        await post.save();
        res.status(200).send({"msg":"post added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})

postRoute.patch("/update/:id",auth,async(req,res)=>{
     const id=req.params.id;
     const post=await PostModel.findOne({_id:id});

     try {
        if(req.body.userID!==post.userID){
            res.status(400).send({"msg":"you are not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({_id:id},req.body);
            res.send({"msg":"post updated successfull"})
        }
     } catch (error) {
        res.status(400).send({"msg":error.message})
     }
})

postRoute.delete("/delete/:id",auth,async(req,res)=>{
    const id=req.params.id;
    const post=await PostModel.findOne({_id:id});

    try {
       if(req.body.userID!==post.userID){
           res.status(400).send({"msg":"you are not authorized"})
       }else{
           await PostModel.findByIdAndDelete({_id:id});
           res.send({"msg":"post deleted successfull"})
       }
    } catch (error) {
       res.status(400).send({"msg":error.message})
    }
})

postRoute.get("/",auth,async(req,res)=>{

     try {
       
        const post=await PostModel.find();
         res.status(200).send(post)

        
     } catch (error) {
        res.status(400).send({"msg":error.msg})
     }
})


module.exports=postRoute;