const bcrypt = require("bcryptjs");

function hash(password) {
    return bcrypt.hashSync(password, 10);
}

function compare(password, hashedpassword) {
    return bcrypt.compareSync(password, hashedpassword);
}

module.exports = { hash, compare };
