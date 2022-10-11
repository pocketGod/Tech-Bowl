const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const Shelf = require('../models/Shelf')
const User = require('../models/User')
const _ = require('lodash')
const auth = require('../middlewares/auth')
const joi = require('joi')

//transfer cart data into shelf history
router.post('/', auth, async(req,res)=>{
    try {
        let cart = await Cart.findOne({userID:req.payload.id})
        if(!cart) return res.status(400).send('No Cart Was Found For This ID')

        let shelf = await Shelf.findOne({userID:req.payload.id})
        if(!shelf) return res.status(400).send('No Shelf Was Found For This ID')

        let shelfItems = [...shelf.items]

        if(!shelfItems.length){
            shelfItems = cart.items
        }
        else{
            cart.items.forEach((itm)=>{

                let every = true

                for (let i = 0; i < shelfItems.length; i++) { 
                    if(shelfItems[i].itemID.toString() == itm.itemID.toString()){
                        shelfItems[i].amount += itm.amount
                        every = false
                    }
                }
                if(every){
                    shelfItems.push(itm)
                }
            })
        }

        let user = await User.findOneAndUpdate({_id:req.payload.id}, {money:req.body.moneyLeft})

        shelf = await Shelf.findOneAndUpdate({userID:req.payload.id}, {items:shelfItems}, {new:true})
        cart = await Cart.findOneAndUpdate({userID:req.payload.id}, {items:[]}, {new:true})

        await cart.save()
        await shelf.save()

        res.status(200).send(shelf)
    } catch (error) {
        res.status(400).send('Error in translating cart to shelf')
    }
})



//get user's shelf
router.get('/', auth, async (req,res)=>{
    try {

        let shelf = await Shelf.findOne({userID:req.payload.id})
        if(!shelf) return res.status(404).send('No Such Shelf')

        res.status(200).send(shelf)

    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
