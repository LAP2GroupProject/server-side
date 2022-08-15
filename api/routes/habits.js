const express = require('express');
const router = express.Router();

const habitsController = require('../controllers/habits');

router.get('/', habitsController.habitIndex);



module.exports = router;