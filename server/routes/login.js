const express = require('express')
const router = express.Router()
const joi = require('joi')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8)
})

router.post('/', async (req,res)=>{
    try {
        let { error } = loginSchema.validate(req.body)
        if(error) return res.status(400).send(error.message)

        let user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).send('Invalid email or password')

        let result = await bcrypt.compare(req.body.password, user.password)
        if(!result) return res.status(400).send('Invalid email or password')

        let token = jwt.sign({id:user._id, name:user.name}, process.env.secretKey)
        res.status(200).send({token:token})

    } catch(err) {
        res.status(400).send('ERROR in POST login')
    }
})



module.exports = router