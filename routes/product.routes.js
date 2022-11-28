const productController = require("../controllers/product.controller");
const {requestValidator, verifyToken}  = require("../middlewares");


module.exports=function (app){
    //api  to create product
    app.post("/ecom/api/v1/products",[requestValidator.validateProductRequest, verifyToken.verifyToken],productController.create)
    //api to get all the products
    app.get("/ecom/api/v1/products", productController.findAll)
    //api to get single product
    app.get("/ecom/api/v1/products/:id",productController.findOne)
    //api to update the product 
    app.put("/ecom/api/v1/products/:id",[requestValidator.validateProductRequest, verifyToken.verifyToken],productController.update)
    //api to delete the product
    app.delete("/ecom/api/v1/products/:id",[verifyToken.verifyToken],productController.delete)
    //api to get products, category wise
    app.get("/ecom/api/v1/categories/:categoryId/products",productController.getProductUnderACategory)
}