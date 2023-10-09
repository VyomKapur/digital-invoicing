const mongoose = require('mongoose')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, { expiresIn: '3d' })
}

const loginUser = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch(error){
        res.status(400).json({Message: "Error logging in user"})
    }
}

const signupUser = async(req, res) => {
    const { email, username, password} = req.body
    try{
        const user = await User.signup(email, username, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(error){
        console.log(error)
        res.status(400).json({Message: "Error creating user"})
    }
}

module.exports = {
    loginUser,
    signupUser
}