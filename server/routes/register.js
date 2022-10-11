const express = require('express')
const bcrypt = require('bcrypt')
const joi = require('joi')
const User = require('../models/User')
const Cart = require('../models/Cart')
const Shelf = require('../models/Shelf')
const jwt = require('jsonwebtoken')
const router = express.Router()


const registerScheme = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(5)
})


router.post('/', async(req,res)=>{
    try {
        let { error } = registerScheme.validate(req.body)
        if(error) return res.status(400).send(error.message)

        let user = await User.findOne({email:req.body.email})
        if(user) return res.status(400).send('user already exists...')
        
        req.body.money = 250

        user = new User(req.body)

        let salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()

        let newCart = new Cart({userID:user._id ,products:[]})
        let newShelf = new Shelf({userID:user._id ,products:[]})

        await newCart.save()
        await newShelf.save()


        let token = jwt.sign({id:user._id}, process.env.secretKey)

        res.status(201).send({token: token})

    } catch (error) {
        res.status(400).send('ERROR in POST user')
    }
})




module.exports = router
