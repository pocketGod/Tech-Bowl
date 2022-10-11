const mongoose = require('mongoose')

const shelfSchema = new mongoose.Schema({
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

const Shelf = mongoose.model('shelfs', shelfSchema)

module.exports = Shelf
