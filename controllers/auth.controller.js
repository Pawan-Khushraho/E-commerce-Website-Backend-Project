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