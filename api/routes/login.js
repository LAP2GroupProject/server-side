const { Router } = require("express")

const loginController = require('../controllers/login');

const loginRoutes = Router()

loginRoutes.post('/', loginController.login);

module.exports = loginRoutes;
