require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500 
const itemRoutes = require('./routes/itemRoutes')
const userRoutes = require('./routes/userRoutes')
const item = require('./models/Item')


const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello")
});

app.use('/items', itemRoutes)

app.use('/users', userRoutes)

const serviceTax = (price, quantity) => {
    let tax = 0;
    if(price > 1000 && price <= 8000){
        tax += price*12/100
    } else if(price > 8000){
        tax += price*18/100
    }
    tax += 100
    return tax*quantity
}

const productTax = (price, quantity) => {
    let tax = 0;
    if(price > 1000 && price <= 5000){
        tax += price*12/100
    } else if(price > 5000){
        tax += price*18/100
    }
    tax += 200
    return tax*quantity
}

app.post('/calculatetax', async (req, res) => {
    const items = req.body;
    if (!items) {
        res.status(400).json({ Message: "Invalid params" });
        return; // Return early to prevent further execution
    }

    try {
        const response = await Promise.all(
            items.map(async (newItem) => {
                const obj = await item.find({id: newItem.id}); 
                let tax;
                if (obj.isService === true) {
                    tax = serviceTax(obj.price, newItem.quantity);
                } else {
                    tax = productTax(obj.price, newItem.quantity);
                }
                return {name: obj[0].name, price: obj[0].price, quantity: newItem.quantity, tax: tax }; 
            })
        );
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        console.log("Connected to the database")
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch((err) => console.log(err))