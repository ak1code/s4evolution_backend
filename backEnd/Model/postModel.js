const mongoose=require("mongoose");

// title ==> String
// body ==> String
// device ==> String

const postSchema=new mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String
});

const PostModel=mongoose.model("post",postSchema);

module.exports=PostModel;