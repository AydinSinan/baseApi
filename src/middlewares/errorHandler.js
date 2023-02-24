const APIError = require("../utils/errors")

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof APIError) { // bir objenin belirli bir sınıfa ait olup olmadığını kontrol eder.
        return res.status(err.statusCode || 401)
            .json({
                success: false,
                message: err.message
            })
    }

    return res.status(500).json({
        success: false,
        message: "Check your API."
    })
}

module.exports = errorHandlerMiddleware 