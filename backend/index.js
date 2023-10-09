require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500 
const itemRoutes = require('./routes/itemRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello")
});

app.use('/items', itemRoutes)

app.use('/users', userRoutes)

mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        console.log("Connected to the database")
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch((err) => console.log(err))