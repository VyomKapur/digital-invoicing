const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/Users')

router.get('/', (req, res) => {
    
})

router.post('/', async(req, res) => {
    const { email, username, password } = req.body;
    if(!email || !username || !password){
        return res.json({Message: 'Error! fields are required!'})
    }
    try {
        const newItem = await User.create({email, username, password})
        res.status(200).json(newItem)
    } catch(error){
        console.log(error)
        return res.status(400).json({Message: `Error: ${error}`})
    }
})

router.patch('/', (req, res) => {
    return res.status(501).json({Message: "Not required for now"})
})


router.delete('/', (req, res) => {

})


module.exports = router