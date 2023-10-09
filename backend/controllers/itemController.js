const { default: mongoose } = require('mongoose');
const item = require('../models/Item')

const getAllItems = async(req, res) => {
    try{
        const items = await item.find({});
        res.status(200).json(items)
    } catch(error){
        return res.status(400).json({Message: `Error: ${error}`})
    }
}

const getItem = async(req, res) => {
    const { id } = req.params  
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({Message: "Invalid Object Id"})
        }
        const targetItem = await item.findById(id)
        if(!targetItem){
            return res.status(404).json({Message: "No such item"})
        }
        res.status(200).json(targetItem)
    } catch(error){
        return res.status(400).json({Message: `Error: ${error}`})
    }
}

const createItem = async(req, res) => {
    const { name, description, price, isService } = req.body;
    if(!name || !description || !price){
        return res.status(300).json({Message: 'Error field names are required!'})
    }
    try {
        const id = new mongoose.Types.ObjectId()
        const newItem = await item.create({name, id, description, price, isService})
        res.status(200).json(newItem)
    } catch(error){
        console.log(error)
        return res.status(400).json({Message: `Error: ${error}`})
    }
}

const deleteItem = async(req, res) => {
    const { id } = req.body
    if(!id){
        return res.status(300).json({Message:  `Error! Field names required`})
    }
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({Message: "Invalid Object Id"})
        } 
        const oldItem = await item.findOneAndDelete({id: id})
        if(!oldItem){
            return res.status(404).json({Message: "No such item"})
        }
        res.status(200).json({Message: `${oldItem.id} deleted successfully!`})
    } catch(error) { 
        res.status(400).json({Message: `Error: ${error}`})
    }
}

module.exports = {
    getAllItems,
    getItem,
    createItem,
    deleteItem
}