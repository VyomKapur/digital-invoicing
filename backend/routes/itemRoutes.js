const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const item = require('../models/Item')

router.get('/', (req, res) => {
    
})

router.post('/', async(req, res) => {
    const { name, description, price, isService } = req.body;
    if(!name || !description || !price || !isService){
        return res.json({Message: 'Error field names are required!'})
    }
    try {
        const newItem = await item.create({name, description, price, isService})
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