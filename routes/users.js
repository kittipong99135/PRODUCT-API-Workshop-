var express = require('express');
var router = express.Router();

const { auth } = require('../middleware/authen');
const { isAdmin } = require('../middleware/privilege');

const { regis, login, remove, approve, userApprove, confirmUser } = require('../controller/users');

/* GET users listing. */
router.post('/login', login);
router.post('/regis', regis);
router.get('/approve', auth, isAdmin, approve);
router.get('/approve/:id', auth, isAdmin, userApprove);
router.put('/approve/:id', auth, isAdmin, confirmUser);
router.delete('/users/:id', auth, isAdmin, remove);

module.exports = router;
