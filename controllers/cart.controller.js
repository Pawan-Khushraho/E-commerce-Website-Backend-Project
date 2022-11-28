const cartModel = require("../models")
const Cart = cartModel.cart
const Product = cartModel.product
const Op = cartModel.Sequelize.Op


exports.create = (req,res)=>{
    Cart.create({
        userId: req.userId
    })
    .then((cart) => {
        res.status(200).send(cart)
    }).catch((err) => {
        res.status(500).send({
            message:"Something went wrong while creating the cart"+err.message
        })
    });
}