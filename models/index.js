const env = process.env.NODE_ENV || 'production';
const dbConfig = require("../configs/db.config")[env];
const Sequelize = require("sequelize");

const sequelize = new Sequelize (
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host : dbConfig.HOST,
        dialect : dbConfig.dialect
    }
)

const DB = {}
DB.sequelize = sequelize;
DB.Sequelize = Sequelize;
DB.role = require("./role.model")(DB.sequelize,Sequelize)
DB.user = require("./user.model")(DB.sequelize,Sequelize)
DB.category = require("./category.model")(DB.sequelize,Sequelize)
DB.product = require("./product.model")(DB.sequelize,Sequelize)
DB.cart = require("./cart.model")(DB.sequelize,Sequelize)


//estabilishing relationship between users and roles : many to many
//user to role : one to many
DB.user.belongsToMany(DB.role,{
    through : "user_roles",
    foreignKey : "userId"
})
//role to user : one to many relation
DB.role.belongsToMany(DB.user,{
    through: "user_roles",
    foreignKey: "roleId"
})


DB.product.belongsToMany(DB.cart,{
    through:"cart_products",
    foreignKey:"productId"
})
DB.cart.belongsToMany(DB.product,{
    through: "cart_products",
    foreignKey:"cartId"
})

//user to cart reln : one to many relation
DB.user.hasMany(DB.cart)



DB.category.hasMany(DB.product);


module.exports = DB;