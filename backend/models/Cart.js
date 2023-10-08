const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    items: [
        {
        id: { 
            type: mongoose.Schema.Types.ObjectId, 
        },
        quantity: Number,
        price: Number,
        },
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;  