const db = require("../config/connection");

module.exports = {
    Create: (groupName) => {
        return new Promise((resolve, reject) => {
            var Query = "INSERT INTO inventory (Category) VALUES ('" + 
            groupName + "');"
            console.log(Query);
            db.query(Query, (err, result) => {
                if(err){
                    console.log("An error in Creating Inventory Data", err);
                    reject(-1);
                }
                else{
                    resolve(result);
                }
            })
            
        })

    },
    Read: () => {
        return new Promise((resolve, reject) => {
            var Query = "Select * from Inventory";
            console.log(Query);
            db.query(Query, (err, result) => {
                if(err){
                    console.log("An error in retriveing Inventory Data", err);
                    return -1;
                }
                else{
                    resolve(result);
                }
            })
        })
    },
    Update: (id, weight, qty) => {
        return new Promise((resolve, reject) => {
            var Query = "UPDATE inventory SET Weight = " + weight + ",Quantity = " + qty + " WHERE ProductID = " + id + ";";
            console.log(Query);
            db.query(Query, (err, result) => {
                if(err){
                    console.log("An error in retriveing Inventory Data", err);
                    return -1;
                }
                else{
                    resolve(result);
                }
            })
        })
    },
    UpdateAfterSaleInventory: (productWt) => {
        return new Promise((resolve, reject) => {
            productWt.forEach(element => {
                var Query = "UPDATE inventory SET Weight = " 
                            + element.catWt + ",Quantity = " 
                            + element.catQt + " WHERE ProductID = " 
                            + element.catId + ";";
                console.log(Query);
                db.query(Query, (err, result) => {
                    if(err){
                        console.log("An error in retriveing Inventory Data", err);
                        return -1;
                    }
                    else{
                        resolve(result);
                    }
                })    
            });
            
        })
    },
}
