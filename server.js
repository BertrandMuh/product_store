const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const product = require('./models/product')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const database = 'ProductStore';
const connectionStr = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@mongosetup.ag3i9yt.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', () => {
    console.log('mongo connected');
})

app.get('/get_products', async (req, res) => {
    let response = await product.find({});
    res.send(response)
})

app.post('/create_product', async (req, res) => {
    let data = req.body;
    console.log(data);
    let response = await product.create(data);
    console.log(response);
    res.send(response)
})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})