const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/authen');
const { isAdmin, approved} = require('../middleware/privilege');

const { create, read ,remove, confirmOrder } = require('../controller/order');

// router.post('/order', auth, approved, create);
// router.get('/order', auth, approved, list);
// router.put('/order/:id', auth, isAdmin, approved, update);
router.get('/orders', auth, approved, read); 
router.delete('/orders/:id', auth, approved, remove);
router.delete('/orders/:id/confirm', auth, approved, confirmOrder);

module.exports = router;