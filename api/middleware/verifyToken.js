const jwt = require ("jsonwebtoken");

function verifyToken(res, res, next) {
    const header = res.header["authorization"];

    if (header) {

        const token = header.split(' ')[1];

        jwt.verify(token, process.env["SECRET_PASSWORD"], (err, decoded) => {

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
