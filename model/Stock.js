const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Stock = new Schema({
    count: Number,
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Stock', Stock)