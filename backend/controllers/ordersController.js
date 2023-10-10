const Orders = require('../models/Orders')
const User = require('../models/Users')

const getAllOrders = async(req, res) => {
    const { user_email } = req.body
    const user = await User.findOne({email: user_email})
    if(!user){
        return res.status(400).json({Message: "Illegal, user not found!"})
    }
    const user_id = user._id
    if(!user_id){
        return res.status(400).json({Message: "Incorrect user ID"})
    }
    try{
        const orders = await Orders.find({user_id: user_id})
        res.status(200).json(orders)
    } catch(error){
        return res.status(400).json({Message: `Error: ${error}`})
    }
}

const createOrder = async(req, res) => {
    const { user_email, items, totalPrice } = req.body
    const user = await User.findOne({email: user_email})
    if(!user){
        return res.status(400).json({Message: "Illegal, user not found!"})
    }
    const user_id = user._id
    if(!user_id || !items || !totalPrice){
        return res.status(400).json({Message: "All fields required"})
    }
    try{
        const order = await Orders.create({user_id, items, totalPrice})
        return res.status(200).json(order)
    } catch(error) {
        return res.status(400).json({Message: `Error: ${error}`})
    }
}

module.exports = {
    getAllOrders,
    createOrder
}