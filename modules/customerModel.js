const db = require("../config/connection");

module.exports = {
    Create : (custData) => {
        return new Promise((resolve, reject) => {
            var Query = "INSERT INTO Customer (CustName, PhoneNo, Aadhaar, Address) VALUES ('" + 
                        custData.name+ "', " +
                        custData.phno+ ", " +
                        custData.adhr + ", '" +
                        custData.addr + "');";
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
    
    Find : (custData) => {
        return new Promise((resolve, reject) => {
            var Query = "Select CustID from Customer where PhoneNo = "+ custData.phno + " ;";

            console.log(Query);
            db.query(Query, (err, result) => {
                if(err){
                    console.log("An error in Creating Customer Data", err);
                    reject(-1);
                }
                else if(result.length > 0){
                    resolve(result[0].CustID);
                }
                else{
                    resolve(0);
                }
            })
        })
    },
    FindCustDetails : (phNo) => {
        return new Promise((resolve, reject) => {
            var Query = "Select * from Customer where PhoneNo = "+ phNo + " ;";

            console.log(Query);
            db.query(Query, (err, result) => {
                if(err){
                    console.log("An error in Creating Customer Data", err);
                    reject(-1);
                }
                else if(result.length > 0){
                    resolve(result[0]);
                }
                else{
                    resolve(0);
                }
            })
        })
    }

};