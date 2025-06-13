const express = require('express');
const { getAllTenantsAndUsers } = require('../controllers/getAllTenantsAndUsers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/getAllTenantsAndUsers', authMiddleware, getAllTenantsAndUsers);

module.exports = router;