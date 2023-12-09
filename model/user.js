const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Username : {
        type: String
    },
    Password : {
        type: String
    }, 
    Role : {
        type: String
    },
    Approve : {
        type: Boolean
    }
}, {timestamps : true});

module.exports = mongoose.model('user', userSchema)
