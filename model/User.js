const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    role: {
        type: mongoose.Schema.ObjectId,
        ref: 'Role',
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('User', User)