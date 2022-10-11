const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const logger = require('./middlewares/logger')
const register = require('./routes/register')
const login = require('./routes/login')
const user = require('./routes/user')
const item = require('./routes/item')
const cart = require('./routes/cart')
const shelf = require('./routes/shelf')


const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(logger)

app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/item', item)
app.use('/api/cart', cart)
app.use('/api/shelf', shelf)
app.use('/api/user', user)

app.get('*', (req,res)=>{
    res.status(404).send('No such Endpoint')
})

mongoose.connect(process.env.DBSTRING, {useNewUrlParser: true}).then(()=> console.log('Connected To MongoDB...')).catch(()=> 'Cannot Connet To MongoDB...')

app.listen(PORT, ()=> console.log(`server has started on port: ${PORT}`))