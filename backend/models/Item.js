const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true,
    },
    id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
	price: {
        type: Number,
        required: true
    },
    isService: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema)