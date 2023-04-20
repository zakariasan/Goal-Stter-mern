const express = require('express');
const router = express.Router();
const {login,register, user,logout } = require('../controllers/authController')
router.post('/login',login)
router.post('/register', register)
router.get('/user',user)
router.get('/logout',logout)

module.exports = router
