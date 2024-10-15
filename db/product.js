const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    productId: String,
    company: String
});
    module.exports = mongoose.model("products", productSchema);