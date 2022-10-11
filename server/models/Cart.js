const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    items:{
        required: true,
        type: [{
            itemID: mongoose.Schema.Types.ObjectId,
            amount: Number
        }]
    },
    userID:{
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
})

const Cart = mongoose.model('carts', cartSchema)

module.exports = Cart
