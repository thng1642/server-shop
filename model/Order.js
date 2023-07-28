const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    totalPrice: String,
    phoneNumber: String,
    address: String,
    name: String,
    status: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Item",
        }
    ]
}, { timestamps: true })
module.exports = mongoose.model("Order", Order)