const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdditionalCostSchema = new Schema({
    BillID: {
        type: Number
    },
    ChargeType: {
        type : String
    },
    ChargeAmount: {
        type: Number
    }
}, {timestamps: true});

const AdditionalCostModel = mongoose.model('AdditionalCost', AdditionalCostSchema)
module.exports = AdditionalCostModel;