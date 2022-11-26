const { Sequelize } = require("sequelize")


module.exports = (sequelize,Sequelize)=>{
    const Product = sequelize.define("product",({
        name:{
            type: Sequelize.STRING,
            allowNull : false
        },
        description:{
            type : Sequelize.STRING
        },
        cost :{
            type : Sequelize.INTEGER,
            allowNull : false
        }
    }),{
        tableName: "products"
    }
    )
    return Product
}
