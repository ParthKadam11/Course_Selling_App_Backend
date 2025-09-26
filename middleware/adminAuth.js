const jwt=require("jsonwebtoken");
function adminAuth(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_ADMIN_SECRET);
        req.adminId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message:err });
    }
}

module.exports={
    adminAuth:adminAuth
}