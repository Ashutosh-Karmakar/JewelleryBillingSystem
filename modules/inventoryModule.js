const Inventory = require("../config/model/InventorySchema");

module.exports = {
    Create: (groupName) => {
        return new Promise((resolve, reject) => {
            let productId = 1;
            Inventory.find().sort({_id:-1}).limit(1)
            .then((result) =>{
                console.log(result);
                console.log("hi");
                if(result.length > 0){
                    console.log("hello");
                    productId = result[0].ProductID + 1;
                }
                let invt = new Inventory({
                    ProductID: productId,
                    Category: groupName
                })
                invt.save()
                .then((result) =>{
                })
                .catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                console.log(err);
            })
            
            
        })

    },
    Read: () => {
        return new Promise((resolve, reject) => {
            Inventory.find()
            .then((result) =>{
                resolve(result);
            })
            .catch((err) => {
                console.log(err);
            })
        })
    },
    Update: (id, weight, qty) => {
        if(weight<0 || qty<0){
            return;
        }
        return new Promise((resolve, reject) => {
            Inventory.updateOne({ProductID : id},
            {
                $set: {
                    Weight:weight,
                    Quantity:qty
                },
                $currentDate: { lastUpdated: true }
            }, { new : true})
            .then((result) => {
                // console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
        })
    },

    UpdateAfterSaleInventory: (productWt) => {
        
        return new Promise((resolve, reject) => {
            let invtUpdate = [];
            productWt.forEach(element => {
            if(element.catWt<0 || element.catQt<0){
                reject(-1);
                return;
            }
                invtUpdate.push({
                    updateOne:
                    { 
                        filter : {ProductID : element.catId},
                        update : { 
                            $set: {
                                Weight:element.catWt,
                                Quantity:element.catQt
                            }
                        }
                    }
                })
            });
            Inventory.bulkWrite(invtUpdate)
            .then((result) => {
                console.log(result);
                resolve(result);
            })
            .catch((err) => {
                reject(-1);
                console.log(err);
            })
            
        })
    },
}
