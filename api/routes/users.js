const { Router } = require("express")

const usersController = require('../controllers/users');
const verifyToken = require("../middleware/verifyToken");

const usersRoutes = Router()
usersRoutes.use(verifyToken)

usersRoutes.get('/', usersController.index); //gets all users
usersRoutes.get('/:id', usersController.show); //gets all users by id

// router.post('/', verifyToken, usersController.create); //creates post route for users

module.exports = usersRoutes;