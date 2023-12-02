const Customer = require("../config/model/CustomerSchema");

module.exports = {
    Create : (custData) => {
        return new Promise((resolve, reject) => {
            let custId = 1;
            Customer.find().sort({_id:-1}).limit(1)
            .then((result) => {
                if(result.length > 0){
                    custId = result[0].CustID + 1;
                }
                let cust = new Customer({
                    CustID : custId,
                    CustName: custData.name,
                    PhoneNo: custData.phno,
                    Aadhaar: custData.adhr,
                    Address: custData.addr
                });
                cust.save()
                .then((result) => { 
                    resolve(result.CustID);
                })
                .catch((err) => {
                    console.log(err)
                });
            })
            .catch((err) => {
                console.log(err);
            })
            
        })
    },
    Find : (custData) => {
        return new Promise((resolve, reject) => {
            let returnval = 0;
            Customer.find({PhoneNo: custData.phno})
            .then((result) => {
                if(result.length > 0){
                    returnval = result[0].CustID;
                }
                resolve(returnval);
            })
            .catch((err) => {
                console.log(err);
                reject(-1);
            })

        })
    },
    FindCustDetails : (phNo) => {
        return new Promise((resolve, reject) => {
            let returnval = 0;
            Customer.find({PhoneNo: phNo})
            .then((result) => {
                if(result.length > 0){
                    console.log(result);
                    returnval = result[0]._doc;
                }
                console.log(returnval);
                resolve(returnval);
            })
            .catch((err) => {
                console.log(err);
                reject(-1);
            })
        })
    }

};