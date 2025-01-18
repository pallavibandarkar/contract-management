const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid:{
        typpe:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    }

})

const User = mongoose.model("User",userSchema);

module.exports = User;