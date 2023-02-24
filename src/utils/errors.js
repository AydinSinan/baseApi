class APIError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode || 400
    }
}

module.exports = APIError

// Asıl errorlar middleware içerisinde Hata mesajını buradan gönderiyoruz. -> middlewares/errorHandler
