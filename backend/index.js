require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3500 


mongoose.connect(process.env.DATABASE_URI)
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send("Hello")
});

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})