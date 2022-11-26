const dbConfig = require("../configs/db.config");
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



DB.category.hasMany(DB.product);


module.exports = DB;