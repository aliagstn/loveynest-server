'use strict'

function errorHandler(err, req, res, next) {

    //! 500 Global Error
    let code = 500
    let msg = 'Internal Server Error'

    //! 400 Sequelize Error

    if (err.name === 'EMPTY_INPUT') {
        code = 400
        msg = 'Field Can Not be Empty'
    }

    if (err.name === 'QUIZ_ALLREADY_EXIST') {
        code = 400
        msg = 'This Quiz allready exist'
    }

    if (err.name === 'QUESTION_ALLREADY_EXIST') {
        code = 400
        msg = 'This Question allready exist'
    }

    if (err.name === 'QUIZ_DONE') {
        code = 400
        msg = 'This Quiz allready done'
    }

    //! 404 Bad Request
    if (err.name === 'QUIZ_NOT_FOUND') {
        code = 404
        msg = 'Quiz is not found'
    }

    res.status(code).json({
        statusCode: code,
        message: msg
    })
}

module.exports = errorHandler