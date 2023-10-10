const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const { getAllProducts, getAllServices, createItem, deleteItem } = require('../controllers/itemController')


router.use(auth)

router.get('/products', getAllProducts)

router.get('/services', getAllServices)

router.post('/', createItem)

router.patch('/', (req, res) => {
    return res.status(501).json({Message: "Not required for now"})
})

router.delete('/', deleteItem)


module.exports = router