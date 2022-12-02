const categoryModel = require("../models");
const Category = categoryModel.category;

exports.create = (req,res)=>{
    if (!req.body.name) {
        res.status(400).send("please enter category name")
    }
    return Category.create({
        name: req.body.name,
        description: req.body.description
    })
    .then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send("Something Went Wrong while creating category")
    });
}

exports.findAll = (req,res)=>{
    Category.findAll()
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(500).send("something went wrong")
    });
}

exports.findOne = (req,res)=>{
    const categoryId = req.params.id
    Category.findByPk(categoryId)
    .then((category) => {
        if (!category) {
            return res.status(400).send("Category not found, please enter valid Id")
        }
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send("something went wrong, no data found")
    });
}

exports.delete = (req,res)=>{
    const categoryId = req.params.id
     Category.destroy({
        where:{
            id:categoryId
        }
     })
     .then(() => {
        res.status(200).send("deleted sucessfully")
     }).catch((err) => {
        res.status(500).send("something went wrong",err)
     });
}

exports.update = (req,res)=>{
    const categoryId = req.params.id
    let category = {
        name: req.body.name,
        description : req.body.description
    }

    Category.update(category,{
        where:{
            id:categoryId
        }
    })
    .then((data) => {
       if (data == 1) {
            res.send("Category Successfully Updated")
       }else{
        res.send("Something went wrong, Please enter value UserId")
       }
    }).catch((err) => {
        res.status(500).send("something went wrong in updating the category",err)
    });
    
}

