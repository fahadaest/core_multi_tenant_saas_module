// routes/tenantRoutes.js
const express = require('express');
const { registerTenant } = require('../controllers/tenantController');
const router = express.Router();

router.post('/register', registerTenant);

module.exports = router;
