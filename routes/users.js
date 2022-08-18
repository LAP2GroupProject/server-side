const { Router } = require("express")

const usersController = require('../controllers/users');
const verifyToken = require("../middleware/verifyToken");

const usersRoutes = Router()
usersRoutes.use(verifyToken)

usersRoutes.get('/', usersController.index); //gets all users
//usersRoutes.get('/:id', usersController.show); //gets all users by id
usersRoutes.get('/habits', usersController.showHabits); //gets all user's habits
usersRoutes.post('/complete', usersController.completeHabit) //completes a user's habits for the day
//usersRoutes.get('/username/:name', usersController.showByName); //gets user by name

// router.post('/', verifyToken, usersController.create); //creates post route for users

module.exports = usersRoutes;