const db = require("../models");
const Category = db.category;

const validateCategoryRequest = (req,res,next)=>{
    if (!req.body.name) {
        res.status(400).send("Please enter a valid Category Name")
    }
    if (req.body.name =="") {
        res.status(400).send("Please enter a valid Category Name")
    }
    next();
}

const validateProductRequest = (req,res,next)=>{
    if (!req.body.name) {
        res.status(400).send("Please enter a valid Product Name")
        return
    }
    if (req.body.name =="") {
        res.status(400).send("Please enter a valid Product Name")
        return;
    }

    if (req.body.categoryId) {
        Category.findByPk(req.body.categoryId)
        .then((category) => {
            if(!category){
                res.status(400).send("Category Id entered, doesn't exist.")
                console.log("problem in create the product")
                return;
            }
            next();
        }).catch((err) => {
            res.status(500).send("something went wrong while searching the categoryId")
        });
    }  else {
        res.status(400).send("Please enter a valid CategoryID Name")
    } 
   
}


module.exports = {
    validateCategoryRequest : validateCategoryRequest,
    validateProductRequest : validateProductRequest
}