"use strict";

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const convertPayloadToToken = (payload) => {
    return jwt.sign(payload, secretKey, {
        expiresIn: "1h",
    });
};

const convertTokenToPayLoad = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = { convertPayloadToToken, convertTokenToPayLoad };
