const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    CustID:{
        type: Number
    },
    CustName: {
        type: String
    },
    PhoneNo: {
        type : Number
    },
    Aadhaar: {
        type: Number
    },
    Address: {
        type: String
    }
}, {timestamps: true});

const CustomerModel = mongoose.model('Customer', CustomerSchema)
module.exports = CustomerModel;