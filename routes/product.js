var express = require('express');
var router = express.Router();

const { auth } = require('../middleware/authen');
const { isAdmin, approved } = require('../middleware/privilege')

const { create, list, read, update, remove, addOrder, productOrder } = require('../controller/product'); 

/* GET home page. */
router.post('/product', auth, isAdmin, create);
router.get('/product', auth, list);
router.get('/product/:id', auth, read); 
router.put('/product/:id', auth, isAdmin, update);
router.delete('/product/:id', auth, isAdmin, remove);
router.post('/product/:id/orders', auth, approved, addOrder);
router.get('/product/:id/orders', auth, approved, productOrder);

module.exports = router;
