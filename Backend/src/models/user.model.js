const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    email:{
        type:String,
        unique:[true,"Email must be unique"],
        required:[true,"Email is required"]
    },
    username:{
        type:String,
        unique:[true,"Username must be unique"],
        required:[true,"Username is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false
    },
    
})


const userModel = mongoose.model("users",userSchema);

module.exports = userModel;