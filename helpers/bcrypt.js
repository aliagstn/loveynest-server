const bcrypt = require('bcryptjs')

function encryptPassword(input) {
  return bcrypt.hashSync(input, 8)
}

function comparePassword(password, userPassword) {
  return bcrypt.compareSync(password, userPassword)
}

module.exports = { encryptPassword, comparePassword } 