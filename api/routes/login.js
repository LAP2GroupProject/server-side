const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.use('/', loginController);

module.exports = router;
