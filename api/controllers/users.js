
const User = require('../models/users')

//Get all users
async function index (req, res) {
    try {
        const users = await User.all;
        
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({err})
    }
}

// get user by ID
async function show (req, res) {
    try {
        const user = await User.findUserById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({err})
    }
}

// get user habits

async function showHabits (req, res) {
    try {
        const user = await User.findHabits(req);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({err})
    }
}

// get user by name
// async function showByName (req, res) {
//     try {
//         const user = await User.getOneByUsername(req.params.name);
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(404).json({err})
//     }
// }

async function create (req, res) {
    try {
        const user = await User.create(req.body.name, req.body.email, req.body.password);
        res.status(201).json(user);
    
    } catch (err) {
        res.status(422).json({err})
    }
}

module.exports={index,create,show,showHabits}