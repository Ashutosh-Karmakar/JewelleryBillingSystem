const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoldRateSchema = new Schema({
    GoldRate:{
        type: Number
    }
}, {timestamps: true});

const GoldRateModel = mongoose.model('GoldRate', GoldRateSchema)
module.exports = GoldRateModel;