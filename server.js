const express = require('express')
const mongoose = require('mongoose');
const { findOneAndUpdate } = require('./models/product');
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
    let response = await product.create(data);
    res.send(response)
})

app.delete('/delete_product/', async (req, res) => {
    let item = { _id: req.query.product_id }
    let response = await product.deleteOne(item)
    res.send(response)
})

app.put('/update_product', async (req, res) => {
    let response = await product.findOneAndUpdate({ _id: req.query.product_id }, req.body, { new: true });
    res.send(response);

})

app.put('/buy_one_product/', async (req, res) => {
    let response = await product.findByIdAndUpdate({ _id: req.query.product_id }, { inventory: req.query.new_inventory }, { new: true })
    console.log(response);
    console.log(req.query)
})

app.get('/get_specific_product/:product_id', async (req, res) => {
    let dataId = req.params.product_id;
    let response = await product.findById(dataId)
    res.send(response)
})

app.get('/get_products_with_a_specific_word_in_it/:name', async (req, res) => {
    let nameStr = req.params.name;
    let response = await product.find({ name: nameStr })
    res.send(response)
})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})