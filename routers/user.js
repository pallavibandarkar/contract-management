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


// userRouter.get("/users",async(req,res)=>{
//     const users = [
//         {
//             userid:"1",
//             role:"Admin",
//         },
//         {
//             userid:"2",
//             role:"Customer",
//         },
//         {
//             userid:"3",
//             role:"Employee",
//         },
//         {
//             userid:"4",
//             role:"Manufacturer"
//         }
//     ]
    
//     const result = await User.insertMany(users)
//     res.send({success:true,data:result})
// })

module.exports = userRouter;
