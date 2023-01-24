const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        imageUrl: String,
        inventory: Number,
        category: String,
        description: String
    },
    {
        timestamps: true
    }
)

const product = mongoose.model('product', productSchema);

module.exports = product