const express= require("express")
const app = express()
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const { adminRouter } = require("./routes/admin")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const port = process.env.PORT

app.use(express.json())

async function main(){
await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(port);
        console.log("MongoDB database connected");
    })
}

main()

app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use("/admin",adminRouter)





