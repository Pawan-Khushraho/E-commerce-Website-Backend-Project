const cartController = require("../controllers/cart.controller")
const {verifyToken} = require("../middlewares")

module.exports=function(app){
    //api to create a carts
    app.post("/ecom/api/v1/carts",[verifyToken.verifyToken],cartController.create);
    //api to add to the cart
    app.put("/ecom/api/v1/carts/:id",[verifyToken.verifyToken],cartController.update);
    //api to get the cart
    //app.get("/ecom/api/v1/carts/:cartId",[verifyToken.verifyToken],cartController.getCart);
}