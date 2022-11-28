const jwt = require("jsonwebtoken");
const secretKeyConfig = require("../configs/auth.config");
const db = require("../models");
const User = db.user;

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
        req.userId = decoded.id;
        next()
    })
}


//whether the user is admin or not
//to check this, we need his/her userID, and after that I can check his/her role[admin or user]
const isAdmin = (req,res,next)=>{
    User.findByPk(req.userId)
    .then((user) => {
        user.getRoles()
        .then((roles)=>{
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return
                }
                
            }
            res.status(403).send({
                message:"Required Admin Access"
            })
            return;
        })
    })
}

module.exports={
    verifyToken:verifyToken,
    isAdmin:isAdmin
}