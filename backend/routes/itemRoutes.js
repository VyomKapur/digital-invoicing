const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const item = require('../models/Item')
const { getAllItems, getItem, createItem, deleteItem } = require('../controllers/itemController')

router.get('/', getAllItems)

router.get('/:id', getItem)

router.post('/', createItem)

router.patch('/', (req, res) => {
    return res.status(501).json({Message: "Not required for now"})
})

router.delete('/', deleteItem)


module.exports = router