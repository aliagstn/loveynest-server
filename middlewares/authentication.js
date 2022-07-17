"use strict";

const { User } = require("../models/index");
const { convertTokenToPayLoad } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;

        // check access token validty
        if (!access_token) {
            throw { name: "invalid access token" };
        }

        // check payload validity
        const payload = convertTokenToPayLoad(access_token);
        const { id } = payload;
        const user = await User.findByPk(id);

        if (!user) {
            throw { code: 401 };
        }

        req.user = {
            id: user.id,
            role: user.role,
            email: user.email,
        };
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authentication;
