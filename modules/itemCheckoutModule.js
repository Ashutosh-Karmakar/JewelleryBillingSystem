const db = require("../config/connection");

module.exports = {
    Create : (noOfEntries, billId, itemData) => {
        return new Promise((resolve, reject) => {
            for(let i=0; i<noOfEntries; i++){
                let Query = "INSERT INTO itemcheckout (BillID, OrnamentType, Weight, MakingCharge, Sgst, Cgst, Amount)VALUES" + 
                            "("  + billId          +
                            ","  + itemData.orna[i]+ 
                            ", "+ itemData.wgt[i] +
                            " ," + itemData.mrc[i] +
                            " ," + itemData.cgt[i] +
                            " ," + itemData.sgt[i] +
                            " ," + itemData.net[i] + ");";
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
            }
        })
        
    }
}