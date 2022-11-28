const jwt = require("jsonwebtoken");
const secretKeyConfig = require("../configs/auth.config");

const verifyToken = (req,res,next)=>{
    let token = req.headers['x-access-token'];

    //if no token provided
    if (!token) {
        return res.status(403).send({
            message:"No Token Provided!"
        })
    }
    jwt.verify(token,secretKeyConfig.secret,(err,decoded)=>{
        //if wrong token provided
        if (err) {
            return res.status(401).send({
                message:"Unauthorised!"
            })
        }
        next()
    })
}

module.exports={
    verifyToken:verifyToken
}