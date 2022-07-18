"use strict";

const errorHandler = (err, req, res, next) => {
    let { code, name } = err;
    let message = null;

    if (name === "SequelizeValidationError") {
        code = 400;
        message = err.message.split(",");
    } else if (name === "SequelizeUniqueConstraintError") {
        code = 401;
        message = "E-mail must be unique";
    } else if (name === "invalid access token") {
        code = 401;
        message = name;
    } else if (name === "EMPTY_INPUT") {
        code = 400;
        message = "Field Can Not be Empty";
    } else if (name === "QUIZ_ALLREADY_EXIST") {
        code = 400;
        message = "This Quiz already exist";
    } else if (name === "QUESTION_ALLREADY_EXIST") {
        code = 400;
        message = "This Question already exist";
    } else if (name === "QUIZ_DONE") {
        code = 400;
        message = "This Quiz already done";
    } else if (name === "QUIZ_NOT_FOUND") {
        code = 404;
        message = "Quiz is not found";
    } else {
        switch (code) {
            case 400:
                message = "Bad request";
                break;
            case 401:
                message = "Unauthorized";
                break;
            case 403:
                message = "Forbidden";
                break;
            case 404:
                message = "Not Found";
                break;
        }
    }
    if (!code) {
        code = 500;
        message = "Internal Server Error";
    }

    res.status(code).json({
        statusCode: code,
        message: message,
    });
};

module.exports = errorHandler;
