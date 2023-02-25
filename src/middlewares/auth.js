const jwt = require("jsonwebtoken");

const createToken = async (user, res) => {
    console.log(user)
    // return res.json(user);
    const payload = {
        sub: user._id,
        name: user.name
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return res.status(201).json({
        success: true,
        token,
        message: "Token İşlemi Başarılı"
    })
}

module.exports = {
    createToken
}