const jwt=require("jsonwebtoken");

function userAuth(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,process.env.JWT_USER_SECRET);
    if(decoded){
        req.userId=decoded.id
        next()
    }else{
        res.json({
            message:"You are not signed In"
        })
    }
}

module.exports={
    userAuth:userAuth
}