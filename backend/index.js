const express = require("express");
const app = express();
require('dotenv').config()
require('./Models/db');
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter');
const AddProperties = require('./Routes/AddProperties')
const GetProperties = require('./Routes/AddProperties')

const PORT = process.env.PORT || 8080

app.get('/ping', (req, res) => {
    res.send('PONG');
})

app.use(bodyParser.json())
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow headers
}));

app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)
app.use('/properties', AddProperties)

app.listen(PORT, () => {
    console.log(`server is running on the ${PORT}`)
})