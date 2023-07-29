const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema({
    quantity: Number,
    name: String,
    price: String,
    image: String,
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Item', Item)