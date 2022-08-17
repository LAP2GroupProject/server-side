// require(".env").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

async function createToken(userData) {
    const token = await jwt.sign({
        id: userData["id"]
    }, process.env["SECRET_PASSWORD"], {expiresIn: 60 * 60})

    return token;
}

async function login (req, res) {

    try {
        const name = req.body.name;
        const password = req.body.password;

        //check if there is a user that matches username
        const user = await User.getOneByUsername(name);

        //check if password matches hashing
        const authenticated = await bcrypt.compare(password, user.password);

        if (authenticated) {
            res.json({
                success: true,
                token: "Bearer " + await createToken(user) 
                /////////// can i create a token using user.id instead? //////////////
            })
        } else {
            throw "Credentials do not match"
        }

    } catch (err) {

        console.log(err)

        res.status(401).json({
            success: "false",
            error: 'Error. Unable to authenticate user.'
        })
    }
}

async function register(req, res)  {
    try {
        const user = await User.register(req.body.name, req.body.email, req.body.password);
        res.status(201).json(user);
    } catch (err) {
        res.status(404).json({err});
    }
}

module.exports = {login, register}
