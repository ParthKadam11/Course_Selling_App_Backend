const {Router}=require("express")
const userRouter=Router()
const {userModel, purchaseModel, courseModel}=require("../db")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const{userAuth}=require("../middleware/userAuth")
const { default: mongoose } = require("mongoose")

userRouter.post("/signup",async function(req,res){
    const {name,email,password}=req.body;
    try{
        const hashed_password=await bcrypt.hash(password,5)
        await userModel.create({
        name:name,
        email:email,
        password:hashed_password
        })
        res.json({
            message:"User is Signed Up!"
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message})
    }
    
})

userRouter.post("/login",async function(req,res){
const {email,password}=req.body;
    const user=await userModel.findOne({
        email:email
    })    
    if(!user){
        res.json({
            message:"No User Found SignUp First"
        })
    }
    const password_match=await bcrypt.compare(password,user.password)

    if(password_match){
        try{const token=jwt.sign({
            id:user._id.toString()
        },process.env.JWT_USER_SECRET)
        res.json({
            message:"User is logged in",
            token:token
        })}
        catch(err){
            console.log(err);
        }
    }
})

userRouter.get("/purchases",userAuth,async function(req,res){
    const userId=req.userId
    const purchases=await purchaseModel.find({
        userId
    })
    const courseData=await courseModel.find({
        _id:{$in: purchases.map(x=>x.courseId)}
    })
    res.json({
        purchases,
        courseData
    })
})

module.exports={
    userRouter:userRouter
}