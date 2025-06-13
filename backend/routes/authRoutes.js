const express = require('express');
const router = express.Router();
const { login, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login);
router.get('/user', authMiddleware, getCurrentUser);

module.exports = router;