const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String,
        minLength: 2
    },
    img:{
        required:true,
        type:String,
        minLength:2
    },
    category:{
        type:String,
        require:true,
        minLength:2
    },
    description:{
        type:String,
        require:true,
        minLength:2
    },
    price:{
        required:true,
        type: Number,
        min:0.1
    }
})

const Item = mongoose.model('items', itemSchema)

module.exports = Item
