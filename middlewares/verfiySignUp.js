const db = require("../models")
const User = db.user
const Role = db.role

const checkDuplicateUsernameOrEmail = (req,res,next)=>{
    User.findOne({
        where:{
            username : req.body.username
        }
    })
    .then((user) => {
        if (user) {
            res.status(400).send({message:"Sign Up Failed, User already exists"})
            return
        }
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then((user) => {
            if (user) {
                res.status(400).send({message:"Sign Up Failed, Email already exists"})
                return
            }
            next()
        })
    })
}


const checkRolesExisted =(req,res,next)=>{
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            Role.findOne({
                where:{
                    name:req.body.roles[i]
                }
            })
            .then((role) => {
                if (!role) {
                    res.status(400).send({
                        message:`Failed! ${req.body.roles[i]} does not exists`
                    })
                    return
                }
                next()
            })            
        }
    } 
}

module.exports ={
    checkDuplicateUsernameOrEmail:checkDuplicateUsernameOrEmail,
    checkRolesExisted:checkRolesExisted
}