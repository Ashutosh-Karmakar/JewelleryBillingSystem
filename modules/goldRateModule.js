const db = require("../config/connection");

module.exports = {
    Create : (rate) => {
        return new Promise((resolve, reject) => {
            var Query = "INSERT INTO goldrate (GoldRate) VALUES (" + rate + ");";
            console.log(Query);
            db.query(Query, (err, result) => {
                if(err){
                    console.log("An error in Creating Customer Data", err);
                    return -1;
                }
                else{
                    resolve(result);
                }
            })
        })
    },
    
    Find : () => {
        return new Promise((resolve, reject) => {
            var Query = "Select GoldRate from goldrate order by dateofUpdate DESC LIMIT 1;";
            console.log(Query);
            db.query(Query, (err, result) => {
                if(err){
                    console.log("An error in Creating Customer Data", err);
                    return -1;
                }
                else{
                    resolve(result);
                }
            })
        })
    }

};