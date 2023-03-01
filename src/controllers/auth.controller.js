const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");

const login = async (req, res) => { 
    const { email, password} = req.body
    const userInfo = await user.findOne({email})
    console.log(userInfo)
    if(!userInfo)
        throw new APIError("Email ya da Password hatalıdır", 401)
    

    const comparePassword = await bcrypt.compare(password, userInfo.password)
    console.log(comparePassword)

    if(!comparePassword)
        throw new APIError("Email ya da Password hatalıdır", 401)

    createToken(userInfo, res)
    };

const register = async (req, res) => {
    const { email } = req.body;
    const userCheck = await user.findOne({ email });
    if (userCheck) {
        throw new APIError("User already exist.Please check your email.", 401);
        //console.log("User already exist")
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log("hash password: ", req.body.password);

    const userSave = new user(req.body);

    await userSave
        .save()
        .then((data) => {
            return new Response(data, "Kayıt Başarıyla Eklendi").created(res);

            /* return res.status(201).json({
                    success: true,
                    data: response,
                    message: "Kayıt Başarıyla Eklendi"
                }) */
        })
        .catch((err) => {
            throw new APIError("Kullanıcı Kayıt Edilemedi", 400)
            console.log(err);
        });
};

const me = async(req, res, next) => {
    console.log(req.user)
    return new Response(req.user).success(res)
}

module.exports = {
    login,
    register,
    me
};
