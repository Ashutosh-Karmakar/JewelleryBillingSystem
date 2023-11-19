const db = require("../config/connection");


module.exports = {
    Create : (billId, additionalData) => {
        return new Promise((resolve, reject) => {
            for(let i=0; i<additionalData.additiontype.length; i++){
                let Query = "INSERT INTO additioncharges (BillID, ChargeType, ChargeAmount) VALUES("
                                            + billId + ", '" 
                                            + additionalData.additiontype[i] + "', " 
                                            + additionalData.additionamt[i] + ");"
                console.log(Query);
                db.query(Query, (err, result) => {
                    if(err){
                        console.log("An error in Creating AdditionalCharge Data", err);
                        return -1;
                    }
                    else{
                        resolve(result);
                    }
                })
            }
        })
    }
}