const authenticationController = require("../controllers/auth.controller")
const {verifySignUp} = require("../middlewares") 

module.exports = function(app){
    app.post("/ecom/api/v1/auth/signup",[verifySignUp.checkDuplicateUsernameOrEmail],authenticationController.signUp)
    app.post("/ecom/api/v1/auth/signin",authenticationController.signIn)
}