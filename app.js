if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const aggrement = require("./routers/agreement.js")
const dburl =process.env.ATLASDB_URL
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

app.use("/contract",aggrement);

app.get("/",(req,res)=>{
    res.send("Hi, I am root page")
})

app.listen(8080,(req,res)=>{
    console.log("Listening on port 8080");
})