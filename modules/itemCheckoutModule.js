const Itemcheckout = require("../config/model/ItemCheckoutSchema");
module.exports = {
    Create : (noOfEntries, billId, itemData) => {
        return new Promise((resolve, reject) => {

            let item = [];
            for(let i=0; i<noOfEntries; i++){
                console.log("in item");
                item.push(
                    {
                        insertOne: {document:{
                            BillID : billId,
                            OrnamentType: itemData.orna[i],
                            Weight: itemData.wgt[i],
                            MackingCharge: itemData.mrc[i],
                            Sgst: itemData.sgt[i], 
                            Cgst: itemData.sgt[i],
                            Amount: itemData.net[i]
                        } }
                    }
                );
            }
            Itemcheckout.bulkWrite(item)
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