const joi = require("joi")
const APIError = require("../../utils/errors")

class authValidation {
    constructor() {}
    static register = async (req, res, next) => {
        try {
            await joi.object({
                name: joi.string().trim().min(3).max(100).required().messages({
                    "string.base": "İsim alanınormal metin olmalıdır.",
                    "string.empty": "İsim alanı boş bırakılamaz",
                    "string.min": "İsim alanı en az 3 karakter olmalıdır",
                    "string.max": "İsim alanı en fazla 100 karakter olmalıdır.",
                    "string.required": "İsim alanı zorunludur"
                }),
                lastname: joi.string().trim().min(3).max(100).required().messages({
                    "string.base": "Soyisim alanınormal metin olmalıdır.",
                    "string.empty": "Soyisim alanı boş bırakılamaz",
                    "string.min": "Soyisim alanı en az 3 karakter olmalıdır",
                    "string.max": "Soyisim alanı en fazla 100 karakter olmalıdır.",
                    "string.required": "Soyisim alanı zorunludur"
                }),
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "E-mail alanınormal metin olmalıdır.",
                    "string.empty": "E-mail alanı boş bırakılamaz",
                    "string.min": "E-mail alanı en az 3 karakter olmalıdır",
                    "string.email": "Lütfen geçerli bir email giriniz",
                    "string.max": "E-mail alanı en fazla 100 karakter olmalıdır.",
                    "string.required": "E-mail alanı zorunludur"
                }),
                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "Password alanınormal metin olmalıdır.",
                    "string.empty": "Password alanı boş bırakılamaz",
                    "string.min": "Password alanı en az 6 karakter olmalıdır",
                    "string.email": "Password geçerli bir email giriniz",
                    "string.max": "Password alanı en fazla 36 karakter olmalıdır.",
                    "string.required": "Password alanı zorunludur"
                })

            }).validateAsync(req.body)
        } catch (error) {
            throw new APIError(error)
            console.log(error)
        }
        next()
    }
}

module.exports = authValidation