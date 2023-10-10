const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    items: [
        {
            name: { 
                type: String,
            },
            quantity:{
                type: Number,
            },
            price: {
                type: Number,
            },
            tax : {
                type: Number
            }
        },
    ],
    totalPrice: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;  