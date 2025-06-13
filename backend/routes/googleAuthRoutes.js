const express = require('express');
const router = express.Router();
const { googleSignup } = require('../controllers/googleAuthController');

router.post('/google-signup', googleSignup);

module.exports = router;