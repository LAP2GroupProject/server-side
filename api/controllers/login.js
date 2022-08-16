const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

async function createToken(userData) {

    const token = await jwt.sign({
        username: userData["username"]
    }, process.env["SECRET_PASSWORD"], {expiresIn: 60 * 60})

    return token;
}

async function login (req, res) {

    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.getOneByUsername(username);

        //check if password matches hashing
        const authenticated = await bcrypt.compare(password, user.password);

        if (authenticated) {
            res.json({
                success: true,
                token: "Bearer" + await createToken(user)
            })
        } else {
            throw "Credentials do not match"
        }

    } catch(err) {
        console.log(err);
        res.status(401).json({
            success: false,
            error: 'Error. Unable to authenticate user.'
        })
    }
}

module.exports = login
