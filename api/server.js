const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());


const usersRoutes = require('./routes/users');
const habitsRoutes = require('./routes/habits');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');

server.use('/users', usersRoutes);
server.use('/habits', habitsRoutes);
server.use('/login', loginRoutes);
server.use('/register', registerRoutes);


module.exports = server
