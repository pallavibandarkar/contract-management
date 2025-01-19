if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const agreement = require("./routers/agreement.js")
const dburl =process.env.ATLASDB_URL
const userRouter = require("./routers/user.js")


main()
.then(()=>{
    console.log("Connected to the atlas db")
})
.catch((err)=>{
    console.log("Error occurred!!",console.log(err))
})

async function main() {
    await mongoose.connect(dburl)
}

app.use(cors())

// async function dropIndex() {
//     await mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

//     const Agreement = mongoose.model('Agreement', new mongoose.Schema({
//         id: { type: String, required: true, unique: true },
//         userid: { type: String },
//         expirationDate: { type: String },
//         status: { type: String, default: 'draft' },
//         createdAt: { type: Date, default: Date.now },
//         updatedAt: { type: Date, default: Date.now },
//         chatHistory: { type: String },
//     }));

//     await Agreement.collection.dropIndex("userid_1");
//     console.log("Index dropped successfully");

    
// }

//dropIndex().catch(err => console.error(err));

app.use("/contract",agreement);
app.use("/user",userRouter);

app.get("/",(req,res)=>{
    res.send("Hi, I am root page")
})

app.listen(8080,(req,res)=>{
    console.log("Listening on port 8080");
})