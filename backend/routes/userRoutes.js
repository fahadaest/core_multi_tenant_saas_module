const express = require('express');
const router = express.Router();
const { getTenantUsers } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/tenant/users', authMiddleware, getTenantUsers);

module.exports = router;