const { Router } = require("express")

const registerController = require('../controllers/login');

const registerRoutes = Router()

registerRoutes.post('/', registerController.register);

module.exports = registerRoutes;
