const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    BillID:{
        type: Number
    },
    OrnamentType: {
        type: Number
    },
    Weight: {
        type : Number
    },
    MackingCharge: {
        type: Number
    },
    Sgst: {
        type: Number
    },
    Cgst: {
        type: Number
    },
    Amount: {
        type: Number
    }
}, {timestamps: true});

const ItemModel = mongoose.model('ItemCheckout', ItemSchema);
module.exports = ItemModel;