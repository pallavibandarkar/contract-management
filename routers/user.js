const express = require('express')
const userRouter = express.Router();

const User = require("../models/user.js");
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));


userRouter.post("/login", async(req,res)=>{
    try{
        const {userid,role} = req.body;
    const user = new User({
        userid:userid,
        role:role,
    })
    const result = await user.save();
    res.send({success:true,msg:"User Logged in successfully"});
    }catch(err){
        res.send({success:false,msg:"Error occurred!!!"})
    }
})