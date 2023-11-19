var mySql = require("mysql");

const dbConnection = mySql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "db",
    auth_plugin: "mysql_native_password"

});


dbConnection.connect((err) => {
    if(err){
        return console.log(err);
    }
    console.log("Connection Successfull");
});

module.exports = dbConnection;