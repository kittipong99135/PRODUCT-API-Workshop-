const mongoose = require('mongoose');

const DBConnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Workshop');
        console.log('Connect Database Success..');
    } catch (error) {
        console.log(error);
        resizeBy.status(500).send('Connect Database Error!!')
    }
}

module.exports = DBConnect;