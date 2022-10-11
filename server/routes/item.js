const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const _ = require('lodash')
const auth = require('../middlewares/auth')
const joi = require('joi')


const itemSchema = joi.object({
    title: joi.string().required().min(2),
    price: joi.number().required().min(0),
    category: joi.string().required().min(2),
    description: joi.string().required().min(2),
    img: joi.string().required().min(2)
})

//add new item to DB
router.post('/', auth, async (req,res)=>{
    try {

        let { error } = itemSchema.validate(req.body)
        if(error) return res.status(400).send(error.message)

        let item = new Item(req.body)

        await item.save()

        res.status(201).send(item)


    } catch(err) {
        res.status(400).send(err)
    }
})

//get all items
router.get('/', auth, async (req,res)=>{
    try {
        let items = await Item.find()
        res.status(200).send(items) 
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/categories', auth, async (req,res)=>{
    try {
        let items = await Item.find()
        if(items.length == 0) return res.status(400).send('No items in DB')
        let categories = new Set()
        items.forEach((itm)=>{
            categories.add(itm.category)
        })
        res.status(200).send(Array.from(categories))
    } catch (error) {
        res.status(400).send('ERROR in GET a categories')
    }
})

//get one item - by itemID
router.get('/:id', auth, async (req,res)=>{
    try {
        let item = await Item.findById(req.params.id)
        if(!item) return res.status(400).send('No Such item')
        res.send(item)

    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router
