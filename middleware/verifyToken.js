const jwt = require ("jsonwebtoken");

function verifyToken(req, res, next) {
    const header = req.headers["authorization"];

    if (header) {

        const token = header.split(' ')[1];

        jwt.verify(token, process.env["SECRET_PASSWORD"], (err, decoded) => {
            //console.log(decoded)
            if (err) {
                res.status(401).json({success: false, message: "Invalid token"});
            } else {
                next()
            }

        });

    } else {
        res.status(401).json({success: false, message: "You are not authorised to access this page."});
    }
}

module.exports = verifyToken;
