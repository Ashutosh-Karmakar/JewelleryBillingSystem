const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    BillID:{
        type: Number
    },
    NoOfItems: {
        type: Number
    },
    PaymentMode: {
        type : String
    },
    CustID: {
        type: Number
    },
    TotalAmount: {
        type: Number
    }
}, {timestamps: true});

const BillModel = mongoose.model('Bill', BillSchema);
module.exports = BillModel;