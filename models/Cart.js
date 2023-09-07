const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    quantity: {
        type: Number,
        default:1,
    },
    productId: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('cart', cartSchema);