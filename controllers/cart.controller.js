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

exports.update = (req,res)=>{
    let cartId = req.params.id;
    let oldCost = 0; //cost of the items already in the cart.

    Cart.findByPk(cartId)//finding cart in the DB in cart table
    .then((cart) => {
        oldCost = cart.cost;
        Product.findAll({
            where:{
                id : req.body.productIds
            }
        })
        .then((items) => {
            cart.setProducts(items)//adding the items to the cart
            .then(() => {
                var newCost =0;
                cart.getProducts()
                    .then((products) => {
                        //add the cost of all the items in the cart
                        for(let i =0; i<products.length;i++){
                            newCost = newCost + products[i].cost
                        }

                        //updating the final cost in the cart table
                        Cart.update({cost : oldCost+newCost},{where:{id:cartId}})
                        res.status(200).send({message:"Successfully added to the Cart"})

                    })
            })
        }).catch((err) => {
            res.status(500).send("Something went wrong while fetching products"+err.message)
        });
    }).catch((err) => {
        res.status(500).send("Something went wrong while fetching cart details"+err.message)
    });
}


exports.getCart = (req,res)=>{
    const cartId = req.params.cartId
    Cart.findByPk(cartId)
    .then((cart) => {
        let ProductSelected = [];
        cart.getProducts()
        .then((products) => {
            
            for(let i =0; i<products.length;i++){
                ProductSelected.push({
                    id:products[i].id,
                    name:products[i].name,
                    cost:products[i].cost
                })
            }
            res.status(200).send({
                id:cart.id,
                ProductSelected:ProductSelected,
                cost:cart.cost
            })
        }).catch((err) => {
            res.status(500).send("something went wrong "+err.message)
        });
    }).catch((err) => {
        res.status(500).send("something went wrong while getting the cart"+err.message)
    });
}