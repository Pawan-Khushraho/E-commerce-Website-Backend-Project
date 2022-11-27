const authenticationModel = require("../models")
const secretKeyConfig = require("../configs/auth.config")
const User = authenticationModel.user;
const Role = authenticationModel.role;
const Op = authenticationModel.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");

exports.signUp = (req,res)=>{
    User.create({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8)
    })
    .then((user) => {
        if(req.body.roles){
            Role.findAll({
                where : {
                    name:{
                        [Op.or] : req.body.roles
                    }
                }
            })
            .then((roles) => {
                //populate user_roles table
                user.setRoles(roles)
                .then(() => {
                    res.status(200).send({
                        message : "User Created Successfully",
                        success : true
                    })
                })
            })
        }
    }).catch((err) => {
        res.status(500).send("Something went wrong while creating the User"+err.message)
    });
}

exports.signIn =(req,res)=>{
    User.findOne({
        where:{
            username : req.body.username
        }
    })
    .then((user) => {
        if(!user){
            res.status(404).send({message:"User Not Found"})
        }

        var isPasswordValid = bcrypt.compareSync(req.body.password,user.password);

        if (!isPasswordValid) {
            return res.status(401).send({message:"Username or Password is not valid"})
        }

        //when both the password and username is valid 
        var token = jwt.sign({id:user.id},secretKeyConfig.secret,{expiresIn:86400})

        res.status(200).send({
            username : user.username,
            accessToken : token,
            message: "Successfully Logged In",
            success : true
        })
    }).catch((err) => {
        res.status(500).send(err.message)
    });
}