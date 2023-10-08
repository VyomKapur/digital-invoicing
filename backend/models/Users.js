const mongoose = require('mongoose')
const Cart = require('./Cart')

const userSchema = new mongoose.Schema({
	email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
	password: {
        type: String,
        required: true
    },
    currentCart: {
        type: Cart.schema,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)