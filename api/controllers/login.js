// require(".env").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

async function createToken(userData) {

    const token = await jwt.sign({
        username: userData["username"]
    }, "" + process.env.SECRET_PASSWORD, {expiresIn: 60 * 60})

    return token;
}

async function login (req, res) {

    try {
        const { username, password } = req.body
        const user = await User.getOneByUsername(username);
        console.log(req.body, user);
        //check if password matches hashing
        const authenticated = await bcrypt.compare(password, user.password);

        if (authenticated) {
            res.json({
                success: true,
                token: "Bearer " + await createToken(user)
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

// async function register (req, res) {

//     try {
//         console.log(req.body);
//         const user = await User.create(req.body);
//         res.status(201).json(user);

//     } catch(err) {
//         console.log(err);
//         res.status(401).json({
//             success: false,
//             error: 'Error. Unable to create user.'
//         })
//     }
// }


async function create(req,res)  {
    try {
        const user = await User.create(req.body.name, req.body.email, req.body.password);
        res.status(201).json(user);
    } catch (err) {
        res.status(404).json({err});
    }
}

module.exports = {login, create}
