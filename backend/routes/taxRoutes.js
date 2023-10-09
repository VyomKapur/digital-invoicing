const express = require('express')
const router = express.Router()
const { getTax } = require('../controllers/taxController')

router.post('/', getTax)

module.exports = router