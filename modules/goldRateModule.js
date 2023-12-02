const GoldRate = require("../config/model/GoldRateSchema");

module.exports = {
    Create : (rate) => {
        return new Promise((resolve, reject) => {
            const goldRate = new GoldRate({
                GoldRate : rate
            })
            goldRate.save()
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            })
        })
    },
    
    Find : () => {
        return new Promise((resolve, reject) => {
            GoldRate.find().sort({_id:-1}).limit(1)
            .then((result) => {
                // console.log(result)
                resolve(result);
            })
            .catch((err) =>{
                console.log(err);
            })
        })
    }

};