const express = require('express')
const router = express.Router()
const joi = require('joi')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')


//get user money balance
router.get('/balance', auth, async (req,res)=>{
    try {
        let user = await User.findById(req.payload.id)
        if(!user) return res.status(400).send('No User was Found')
        res.status(200).send({money:user.money})

    } catch(err) {
        res.status(400).send('Error in getting User`s Money Balance')
    }
})

//edit user money balance
router.post('/balance', auth, async (req,res)=>{
    try {
        let user = await User.findById(req.payload.id)
        if(!user) return res.status(400).send('No User was Found')

        let newBalance = user.money + req.body.money
        
        user = await User.findOneAndUpdate({_id:req.payload.id}, {money:newBalance})

        await user.save()

        res.status(201).send(`new balance is: ${newBalance}`)

    } catch (err) {
        res.status(400).send('Error in editing User`s Money Balance')
    }
})



module.exports = router