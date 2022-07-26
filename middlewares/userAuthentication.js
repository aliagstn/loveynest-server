"use strict";
const { convertTokenToPayload } = require("../helpers/jwt");
const { User } = require("../models");
const userauthentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        console.log(access_token)
        if (!access_token) {
            throw { name: "Invalid access token" };
        }

        const payload = convertTokenToPayload(access_token);
        const { id } = payload;
        const user = await User.findByPk(id);
        if (!user) {
            throw { name: "Invalid access token" };
        }
        req.user = {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            CoupleId: user.CoupleId,
            access_token
        };
        next();
    } catch (err) {
        next(err);
    }
};
module.exports = userauthentication;
