const productModel = require("../models");
const Product = productModel.product;
const Op = productModel.Sequelize.Op;

exports.create =(req,res)=>{
    if (!req.body.name) {
        res.status(400).send("please enter Product name")
    }
    Product.create({
        name: req.body.name,
        description : req.body.description,
        cost : req.body.cost,
        categoryId : req.body.categoryId
    })
    .then(data => {
        res.send(data)   
    }).catch((err) => {
        res.status(500).send("something went wrong")
    });
}

exports.findAll = (req,res)=>{
    let productName = req.query.name;
    let minCost = req.query.minCost;
    let maxCost = req.query.maxCost;

    let promise;
    if (productName) {
        promise = Product.findAll({
            where:{
                name: productName
            }
        })
    }
    else if(minCost && maxCost){
        promise = Product.findAll({
            where :{
                cost :{
                    [Op.gte]:minCost,
                    [Op.lte]:maxCost
                }
            }
        })
    }else if(minCost){
        promise = Product.findAll({
            where :{
                cost :{
                    [Op.gte]:minCost
                }
            }
        })
    }else if(maxCost){
        promise = Product.findAll({
            where :{
                cost :{
                    [Op.lte]:maxCost
                }
            }
        })
    }else{
        promise = Product.findAll()
    }

    promise
    .then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send("something went wrong while retrieving products"+err)
    });
}

exports.findOne = (req,res)=>{
    const productId = req.params.id
    Product.findByPk(productId)
    .then((data) => {
        if (!data) {
            return res.status(400).send("Category not found, please enter valid Id")
        }
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send("something went wrong while retrieving product"+err)
    });
}

exports.update = (req,res)=>{
    const productId = req.params.id
    let product = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost,
        categoryId: req.body.categoryId
    }
    Product.update(product,{
        where:{
            id: productId
        }
    })
    .then((data) => {
        if (data == 1) {
            res.status(200).send("Product Successfully Updated")
       }else{
        res.status(500).send("Something went wrong, Please enter value UserId")
       }
    }).catch((err) => {
        res.status(500).send("Something went wrong while updating product"+err)
    });
}

exports.delete = (req,res)=>{
    const productId = req.params.id
    Product.destroy({
        where:{
            id:productId
        }
    })
    .then(() => {
        res.status(200).send("Product Deleted Successfully")
    }).catch((err) => {
        res.status(500).send("Something went wrong while deleting the Product"+err)
    });
}

exports.getProductUnderACategory=(req,res)=>{
    const categoryId = req.params.categoryId;
    Product.findAll({
        where:{
            categoryId: categoryId
        }
    })
    .then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send("something went wrong")
    });
}