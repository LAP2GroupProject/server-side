const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());



const usersRoutes = require('./routes/users');

server.use('/users', usersRoutes);

module.exports = server