const {Router}=require("express")
const courseRouter=Router()
const {purchaseModel,courseModel}=require("../db")
const {userAuth}=require("../middleware/userAuth")

courseRouter.get("/preview",async function(req,res){
    const courses=await courseModel.find({})
    res.json({
        courses
    })
})

courseRouter.post("/purchase",userAuth,async function(req,res){
    const userId=req.userId
    const courseId=req.body.courseId
    //should check if user paid the price
    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message:"You have Succesfully bought the course"
    })
})

module.exports={
    courseRouter:courseRouter
}