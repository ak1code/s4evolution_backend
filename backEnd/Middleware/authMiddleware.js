
const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{

    const token= req.headers.authorization;

    let decoded=jwt.verify(token,"masai");

    if(decoded){
        req.body.userID=decoded.userID;
        next();
    }else{
        res.stauts(400).send({"msg":"login require"})
    }
};

module.exports=auth;