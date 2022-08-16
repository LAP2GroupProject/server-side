const express = require('express');
const router = express.Router();
const registerController = require('../controllers/login');

router.use('/', registerController.create);



module.exports = router;
