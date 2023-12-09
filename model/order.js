const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    ownerId : {
        type: String
    },
    ownerName:{
        type: String
    }, 
    productId : {
        type: String
    },
    productDetail : {
        type: Object
    },
    quanTity : {
        type: Number
    },
    orderPrice:{
        type: Number
    }
}, {timestamps : true});

module.exports = mongoose.model('order', orderSchema)
