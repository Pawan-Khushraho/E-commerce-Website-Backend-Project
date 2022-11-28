const requestValidator = require("./requestValidator")
const verifySignUp = require("./verfiySignUp")
const verifyToken = require("./authJWT")
const isAdmin = require("./authJWT")

module.exports = {
    //exporting all the middlewares
    requestValidator,
    verifySignUp,
    verifyToken,
    isAdmin
}