const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");


const protect =async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.SECRET);
            res.user = await User.findById(decoded._id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            console.log("Not authorized,token failed");
        }
    }
    if(!token){
        res.status(401);
        console.log("Not authorized,no token");
    }
}
module.exports={protect};