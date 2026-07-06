const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache');



async function registerUser(req,res){

    const {email,username,password} = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    });

    if(isAlreadyRegistered){
        return res.status(400).json({
            message:"User with the same email or username already exists"
        })
    }

    const hash = await bcrypt.hash(password,10);
    const user = await userModel.create({
        email,
        username,
        password:hash
    })


    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{
        expiresIn:"3d"
    })

    res.cookie("token",token)

    return res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            email:user.email,
            username:user.username
        }
    })



}





async function loginUser(req,res){
    const {email,password,username} = req.body;

    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{
        expiresIn:"3d"
    })

    res.cookie("token",token)

    return res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            email:user.email,
            username:user.username
        }
    })

}


async function  getMe(req,res){
    const user = await userModel.findById(req.user.id);

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    return res.status(200).json({
        message:"User fetched successfully",
        user
    })

}



async function logoutUser(req,res){
    const token = req.cookies.token;

    res.clearCookie("token");

    await redis.set(token,Date.now().toString(),"EX",60*60)

    return res.status(200).json({
        message:"User logged out successfully"
    })
}





module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}