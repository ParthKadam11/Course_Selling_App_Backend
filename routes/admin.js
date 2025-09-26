const {Router}=require("express")
const adminRouter=Router()
const {adminModel,courseModel}=require('../db')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config()
const {adminAuth} = require("../middleware/adminAuth.js");

adminRouter.post("/signup",async function(req,res){
const {name,email,password}=req.body;
    try{
        const hashed_password=await bcrypt.hash(password,5)
        await adminModel.create({
        name:name,
        email:email,
        password:hashed_password
        })
        res.json({
            message:"You are Signed Up!"
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message})
    } 
})

adminRouter.post("/login",async function(req,res){
    const {email,password}=req.body;
    const user=await adminModel.findOne({//find returns an array and if not found anything it will return empty array which will make user=true thats why use findOne it will return the exact match or undefined 
        email:email
    })    
    if(!user){
        res.json({
            message:"Incorrect Credentials"
        })
    }
    const password_match=await bcrypt.compare(password,user.password)

    if(password_match){
        try{const token=jwt.sign({
            id:user._id.toString()
        },process.env.JWT_ADMIN_SECRET)
        res.json({
            message:"Admin is logged in",
            token:token
        })}
        catch(err){
            console.log(err);
        }
    }
})

adminRouter.post("/course",adminAuth,async function(req,res){
    const adminId=req.adminId
    const {title,description,price,imageURL}=req.body
    
    const course=await courseModel.create({
        title:title,
        description:description,
        price:price,
        imageURL:imageURL,
        creatorId:adminId
    })
    
    res.json({
        message:"Course Created",
        courseId:course._id
    })
})

adminRouter.put("/course", adminAuth, async function(req, res) {
    const adminId = req.adminId;
    const { title, description, price, imageURL, courseId } = req.body;

    const result = await courseModel.updateOne(
        { _id: courseId, creatorId: adminId },
        { title, description, price, imageURL }
    );

    if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Course not found or not authorized" });
    }

    res.json({ courseId, message: "Course Updated" });
})

adminRouter.get("/course/all",async function(req,res){
    const adminId=req.adminId
    const courses=await courseModel.find({
        creatorId:adminId
    })
    res.json({
        message:"admin courses",
        courses
    })
})

module.exports={
    adminRouter:adminRouter
}


