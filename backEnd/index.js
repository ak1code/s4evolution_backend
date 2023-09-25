const express=require("express");
const {connection}=require("./db");
const userRoute = require("./Route/user.route");
const postRoute = require("./Route/post.route");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
app.use("/users",userRoute)
app.use("/posts",postRoute);


app.get("/",(req,res)=>{
     res.status(200).send({"msg":"wellcome to home page"})
})

app.listen(1100,async()=>{
    try {
       await connection
        console.log("db is running")
        console.log("server is running")
    } catch (error) {
        console.log(error)
    }
})