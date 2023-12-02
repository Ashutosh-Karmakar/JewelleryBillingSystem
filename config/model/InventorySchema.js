const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    ProductID:{
        type: Number
    },
    Category: {
        type: String
    },
    Weight: {
        type : Number
    },
    Quantity: {
        type: Number
    }
}, {timestamps: true});

const InventoryModel = mongoose.model('Inventory', InventorySchema)
module.exports = InventoryModel;