require("dotenv").config();
const JWT = require("jsonwebtoken");
const User = require("../models/user/services");

const isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization;
    let token;
    if (authorization) {
        token = authorization.split(" ")[1];
    }

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decode = JWT.verify(token, process.env.SECRET_KEY);
        const currentUser = await User.getUser({ email: decode.email });
        req.user = currentUser;
        return next();
    } catch (error) {
        req.user = null;
        return next();
    }
};

module.exports = isAuth;
