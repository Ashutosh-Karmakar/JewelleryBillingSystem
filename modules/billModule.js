const Bill = require("../config/model/BillSchema");


module.exports = {
    FindBillNo : () => {
        return new Promise((resolve, reject) => {
            Bill.find().sort({_id:-1}).limit(1)
            .then((result) => {
                if(result.length > 0){
                    resolve(result[0].BillID + 1);
                }
                else{
                    resolve(1);
                }
            })
            .catch((err) =>{
                console.log(err);
                reject(-1);
            })
        })
    },
    CreateBillNoItemCustID : (noOfEntries, custId) => {
        return new Promise((resolve, reject) => {
            // var Query = "INSERT INTO bill (NoOfItems, CustID) VALUES(" +
            //             + noOfEntries + "," 
            //             + custId      + ");";
            // console.log(Query);
            // db.query(Query, (err, result) => {
            //     if(err){
            //         console.log("An error in Creating Bill Data", err);
            //         reject(-1);
            //     }
            //     else{
            //         resolve(result);
            //     }
            // })
            let billId = 1;

            Bill.find().sort({_id:-1}).limit(1)
            .then((result) => {
                if(result.length > 0){
                    billId = result[0].BillID + 1;
                }
                let bill = new Bill({
                    BillID: billId,
                    NoOfItems: noOfEntries,
                    CustID: custId
                });
                bill.save()
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.log(err);
                    reject(-1);
                })
            })
            .catch((err) => {
                console.log(err);
                reject(-1);
            })

            

        })
    },
    UpdateModeNTotal : (billId, modeNTotal) => {
        return new Promise((resolve, reject) => {
            // let Query = "UPDATE bill SET PaymentMode = '" 
            //             + modeNTotal.mode  + "', " +"TotalAmount ="    
            //             + modeNTotal.total + " WHERE BillID = " 
            //             + billId + ";";
            // console.log(Query);
            // db.query(Query, (err, result) => {
            //     if(err){
            //         console.log("An error in Creating Bill Data", err);
            //         reject(-1);
            //     }
            //     else{
            //         resolve(result);
            //     }
            // })
            Bill.updateOne({BillID : billId},
                {
                    $set: {
                        PaymentMode: modeNTotal.mode,
                        TotalAmount: modeNTotal.total 
                    },
                    $currentDate: { lastUpdated: true }
                }, { new : true})
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.log(err);
                    reject(-1);
                });
        })
    }
}