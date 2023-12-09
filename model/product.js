const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName : {
        type: String
    },
    price : {
        type: Number
    }, 
    productDetail : {
        type: String
    },
    order : {
        type: Number
    },
    stock : {
        type: Number
    }
}, {timestamps : true});

module.exports = mongoose.model('product', productSchema)
