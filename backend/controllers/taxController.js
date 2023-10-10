const { mongoose } = require('mongoose');
const item = require('../models/Item')

const calculateProductTax = (price) => {
    if (price > 1000 && price <= 5000) {
        return price * 0.12; 
    } else if (price > 5000) {
        return price * 0.18;
    } else {
        return 0;
    }
}

const calculateServiceTax = (price) => {
    if (price > 1000 && price <= 8000) {
        return price * 0.10; 
    } else if (price > 8000) {
        return price * 0.15; 
    } else {
        return 0; 
    }
}

const serviceTax = (price, quantity) => {
    let tax = calculateServiceTax(price);
    tax += 100;
    return tax * quantity;
}

const productTax = (price, quantity) => {
    let tax = calculateProductTax(price);
    tax += 200; 
    return tax * quantity;
}

const getTax = async (req, res) => {
    const items = req.body;
    if (!items) {
        res.status(400).json({ Message: "Invalid params" });
        return; 
    }

    try {
        const response = await Promise.all(
            items.map(async (newItem) => {
                const obj = await item.findOne({id: newItem.id}); 
                let tax;
                console.log(obj)
                if (obj.isService === true) {
                    tax = serviceTax(obj.price, newItem.quantity);
                } else {
                    tax = productTax(obj.price, newItem.quantity);
                }
                return {name: obj.name, price: obj.price, quantity: newItem.quantity, tax: tax }; 
            })
        );
        console.log(response)
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

module.exports = {
    getTax
}