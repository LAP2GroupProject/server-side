const express = require('express');
const router = express.Router();

const usersController = require("../controllers/users");

router.get('/', usersController.index); //gets all users
router.get('/:id', usersController.show); //gets all users by id
router.post('/', verifyToken, usersController.create); //creates post route for users

module.exports = router;
