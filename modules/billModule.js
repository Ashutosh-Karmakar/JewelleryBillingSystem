const db = require("../config/connection");



module.exports = {
    FindBillNo : () => {
        return new Promise((resolve, reject) => {
            var Query = "SELECT BillID FROM Bill ORDER BY BillID DESC LIMIT 1;";
            console.log(Query);
            db.query(Query, (err, result) => {
                if(err){
                    console.log("An error in Creating Customer Data", err);
                    reject(-1);
                }
                else if(result.length > 0){
                    resolve(result[0].BillID);
                }
                else{
                    resolve(1);
                }
            })
        })
    },
    CreateBillNoItemCustID : (noOfEntries, custId) => {
        return new Promise((resolve, reject) => {
            var Query = "INSERT INTO bill (NoOfItems, CustID) VALUES(" +
                        + noOfEntries + "," 
                        + custId      + ");";
            console.log(Query);
            db.query(Query, (err, result) => {
                if(err){
                    console.log("An error in Creating Bill Data", err);
                    reject(-1);
                }
                else{
                    resolve(result);
                }
            })

        })
    },
    UpdateModeNTotal : (billId, modeNTotal) => {
        return new Promise((resolve, reject) => {
            let Query = "UPDATE bill SET PaymentMode = '" 
                        + modeNTotal.mode  + "', " +"TotalAmount ="    
                        + modeNTotal.total + " WHERE BillID = " 
                        + billId + ";";
            console.log(Query);
            db.query(Query, (err, result) => {
                if(err){
                    console.log("An error in Creating Bill Data", err);
                    reject(-1);
                }
                else{
                    resolve(result);
                }
            })
        })
    }
}