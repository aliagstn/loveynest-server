"use strict";
const { convertPayloadToToken, convertTokenToPayload } = require("../helpers/jwt");
const { User } = require("../models");
async function authorization(req, res, next) {
    try {
        let { access_token } = req.headers;
        let { id } = convertTokenToPayload(access_token);

        let user = await User.findByPk(+id);
        if (user.id === req.user.id) {
            next();
        } else {
            throw { code: 403 };
        }
    } catch (err) {
        next(err);
    }
}

module.exports = authorization;
