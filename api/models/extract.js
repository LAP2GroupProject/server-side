const jwt = require("jsonwebtoken")

async function extractID (token) {
    const rawToken = token.split(' ')[1];
     return jwt.verify(rawToken, process.env["SECRET_PASSWORD"], (err, decoded) => {
         if (err) {
             res.status(401).json({ success: false, message: "Invalid token" });
         } else {
             // const id = decoded.id
             //console.log(decoded);
             return decoded.id;
         }
     });
}

module.exports = extractID