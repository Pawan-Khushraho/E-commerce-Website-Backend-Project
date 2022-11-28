const categoryController = require("../controllers/category.controller");
const {requestValidator, verifyToken}= require("../middlewares")

module.exports= function(app) {
    //routes to add a category
    app.post("/ecom/api/v1/categories",[requestValidator.validateCategoryRequest,verifyToken.verifyToken],categoryController.create)
    //route to get all categories
    app.get("/ecom/api/v1/categories",categoryController.findAll)
    //route to get a single category
    app.get("/ecom/api/v1/categories/:id", categoryController.findOne)
    //route to delete a category
    app.delete("/ecom/api/v1/categories/:id",[verifyToken.verifyToken],categoryController.delete)
    //route to update a category api
    app.put("/ecom/api/v1/categories/:id",[requestValidator.validateCategoryRequest,verifyToken.verifyToken], categoryController.update)
}