const authenticationController = require("../controllers/auth.controller")

module.exports = function(app){
    app.post("/ecom/api/v1/auth/signup",authenticationController.signUp)
    app.post("/ecom/api/v1/auth/signin",authenticationController.signIn)
}