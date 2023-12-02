const AdditionalCost = require("../config/model/AdditionalCostSchema");

module.exports = {
    Create : (billId, additionalData) => {
        return new Promise((resolve, reject) => {
            let addchrg = [];
            for(let i=0; i<additionalData.additiontype.length; i++){
                addchrg.push(
                    {
                        insertOne:{document: {
                            BillID : billId,
                            ChargeType: additionalData.additiontype[i],
                            ChargeAmount: additionalData.additionamt[i],
                        } }
                    }
                );
            }
            console.log(addchrg);
            
            AdditionalCost.bulkWrite(addchrg)
            .then((result) => {
                console.log(result);
                resolve(result);
            })
            .catch((err) => {
                reject(-1);
                console.log(err);
            })

        })
    }
}