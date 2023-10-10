const router = require('express').Router()
const auth = require('../middleware/auth')
const { getAllOrders, createOrder } = require('../controllers/ordersController')

router.use(auth)

router.post('/', getAllOrders)

router.post('/place', createOrder)

module.exports = router