'use strict'

function errorHandler(err, req, res, next) {

    //! 500 Global Error
    let code = 500
    let msg = 'Internal Server Error'

    //! 400 Sequelize Error
    // if (err.name === 'SequelizeValidationError') {
    //     code = 400
    //     msg = err.errors.map(error => error.message).join(", ")
    // }

    // if (err.name === 'SequelizeUniqueConstraintError') {
    //     code = 400
    //     msg = err.errors.map(error => error.message).join(", ")
    // }

    if (err.name === 'EMPTY_INPUT') {
        code = 400
        msg = 'Field Can Not be Empty'
    }

    if (err.name === 'QUIZ_ALLREADY_EXIST') {
        code = 400
        msg = 'This Quiz allready exist'
    }

    //! 401 Invalid Token, Email/password
    if (err.name === 'USER NOT FOUND') {
        code = 401
        msg = 'Invalid email or password'
    }

    if (err.name === 'INVALID TOKEN' || err.name === 'JsonWebTokenError') {
        code = 401
        msg = 'Invalid token'
    }

    //! 403 Error Authorization
    if (err.name === 'NOT ALLOWED') {
        code = 403
        msg = 'Forbidden to access'
    }

    //! 404 Bad Request
    if (err.name === 'QUIZ_NOT_FOUND') {
        code = 404
        msg = 'Quiz is not found'
    }

    if (err.name === 'BAD REQUEST') {
        code = 404
        msg = 'Params must be an integer number'
    }

    res.status(code).json({
        statusCode: code,
        message: msg
    })
}

module.exports = errorHandler