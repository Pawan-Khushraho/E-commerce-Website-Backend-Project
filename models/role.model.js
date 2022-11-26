module.exports = (sequelize,Sequelize)=>{
    const Role = sequelize.define("role",{
            id:{
                type : Sequelize.INTEGER,
                primaryKey : true
            },
            name:{
                type : Sequelize.STRING
            }
    },{
        tableName:"roles"
    })
    return Role
}