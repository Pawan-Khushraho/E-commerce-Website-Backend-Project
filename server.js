const express = require("express");
const serverConfig = require("./configs/server.config")
const bodyParser = require("body-parser")
//intializing app
const app = express()


/* using body parser middleware

used for parsing the request
parsing the request of type json and convert to the object
*/

app.use(bodyParser.json())


/* initializing database */
const db = require("./models");
const Role = db.role;

db.sequelize.sync()
    .then(() => {
        console.log("Database Synced")
        //init()
    })

function init() {
    Role.create({
        id:1,
        name:"user"
    });
    Role.create({
        id:2,
        name:"admin"
    })
}

require("./routes/category.routes")(app)
require("./routes/product.routes")(app)
require("./routes/auth.routes")(app)
app.listen(serverConfig.PORT,()=>{
    console.log(`application started on ${serverConfig.PORT}`)
})