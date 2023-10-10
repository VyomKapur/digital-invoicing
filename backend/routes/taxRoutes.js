const express = require('express')
const router = express.Router()
const { getTax } = require('../controllers/taxController')
const auth = require('../middleware/auth')

router.use(auth)

router.post('/', getTax)

module.exports = router