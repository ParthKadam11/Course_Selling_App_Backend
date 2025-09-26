const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const Schema=mongoose.Schema
const Objectid=mongoose.Types.ObjectId

const user= new Schema({
    name:{type:String,unique:true},
    email:{type:String,unique:true},
    password:String
})

const admin= new Schema({
    name:{type:String,unique:true},
    email:{type:String,unique:true},
    password:String
})

const course= new Schema({
    creatorId:Objectid,
    title:String,
    description:String,
    price:Number,
    imageURL:String,
})

const purchased=new Schema({
    courseId:Objectid,
    userId:Objectid
})

const userModel=mongoose.model("user",user)
const adminModel=mongoose.model("admin",admin)
const courseModel=mongoose.model("course",course)
const purchaseModel=mongoose.model("purchased",purchased)

module.exports={
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel
}