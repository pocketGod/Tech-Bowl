const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const Item = require('../models/Item')
const _ = require('lodash')
const auth = require('../middlewares/auth')
const joi = require('joi')

//get user's cart
router.get('/', auth, async (req,res)=>{
    try {

        let cart = await Cart.findOne({userID:req.payload.id})
        if(!cart) return res.status(404).send('No Such Cart')

        // let cartItems = []
        // console.log(cart);

        // cart.items.forEach(async (item, index) => {
        //     let itemDetails = await Item.findById(item.itemID)
        //     let fullItem = JSON.parse(JSON.stringify(itemDetails))
        //     fullItem.amount = item.amount
        //     cartItems.push(fullItem)


        //     if(index==cart.items.length-1){
        //         // console.log(cart.items.length==cartItems.length)
        //         res.status(200).send(cartItems)
        //     }
        // })

        res.status(200).send(cart)

    } catch (error) {
        res.status(400).send(error)
    }
})

//get user's cart's details in brief
router.get('/brief', auth, async (req,res)=>{
    try {
        let cart = await Cart.findOne({userID:req.payload.id})
        if(!cart) return res.status(404).send('No Such Cart')

        let cartLength = 0
        let cartItems = []

        cart.items.forEach((item)=>{
            cartLength += item.amount
            for (let i = 0; i < item.amount; i++) {
                cartItems.push(item.itemID)
            }
        })

        res.status(200).send({cartLength:cartLength, itemsIDArr: cartItems})

    } catch (error) {
        res.status(400).send(error)
    }
})

//add item to cart - itemID sent in request body
router.post('/', auth, async (req,res)=>{
    try {
        
        let cart = await Cart.findOne({userID:req.payload.id})
        if(!cart) return res.status(400).send('No Such Cart')

        let item = cart.items.filter((item)=> item.itemID == req.body.itemID)

        let itemIndex = cart.items.indexOf(item[0])

        if(itemIndex == -1) {
            cart.items.push({itemID: req.body.itemID, amount: 1})
        }
        else{
            cart.items[itemIndex].amount++
        }
        
        await cart.save()

        res.status(201).send(cart)


    } catch (error) {
        res.status(400).send(error)
    }
})

//remove one instance of an item 
router.post('/remove-instance', auth, async (req,res)=>{
    try {
        
        let cart = await Cart.findOne({userID:req.payload.id})
        if(!cart) return res.status(400).send('No Such Cart')

        let item = cart.items.filter((item)=> item.itemID == req.body.itemID)

        let itemIndex = cart.items.indexOf(item[0])

        if(itemIndex == -1) return res.status(404).send('No Such Item in Cart')
        else if(cart.items[itemIndex].amount == 1){
            cart.items.splice(itemIndex,1)
        }
        else{
            cart.items[itemIndex].amount--
        }
        
        await cart.save()

        res.status(201).send(cart)


    } catch (error) {
        res.status(400).send(error)
    }
})

//remove item from cart
router.post('/remove-item', auth, async (req,res)=>{
    try {
        
        let cart = await Cart.findOne({userID:req.payload.id})
        if(!cart) return res.status(400).send('No Such Cart')

        let item = cart.items.filter((item)=> item.itemID == req.body.itemID)

        let itemIndex = cart.items.indexOf(item[0])

        if(itemIndex == -1) return res.status(404).send('No Such Item in Cart')
        else{
            cart.items.splice(itemIndex,1)
        }
        
        await cart.save()

        res.status(201).send(cart)


    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
