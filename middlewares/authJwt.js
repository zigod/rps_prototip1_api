const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/usersModel");

verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    console.log(req.headers.authorization);
    if (!token) {
        return res.status(403).send({ message: "No token!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken,
};

module.exports = authJwt;
