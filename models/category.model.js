const { Sequelize } = require("sequelize");


module.exports = (sequelize,Sequelize)=>{
    const Category = sequelize.define("category",({
        name:{
            type: Sequelize.STRING,
            allowNull : false
        },
        description:{
            type : Sequelize.STRING
        }
    }),{
        tableName : "categories"
    }
    )
    return Category
}
