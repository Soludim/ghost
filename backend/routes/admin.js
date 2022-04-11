const express = require('express');
const { adminLogin } = require('../controllers/admin');

const router = express.Router();

router.post('/login', adminLogin)  //login

module.exports = router;