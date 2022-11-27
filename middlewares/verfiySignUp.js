const db = require("../models")
const User = db.user


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


module.exports ={
    checkDuplicateUsernameOrEmail:checkDuplicateUsernameOrEmail
}