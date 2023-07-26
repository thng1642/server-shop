const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    name: String,
    price: String,
    long_desc: String,
    short_desc: String,
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model("Product", Product)