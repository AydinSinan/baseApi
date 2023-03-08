const rateLimit = require("express-rate-limit")
const allowList = ["::1"] // localden gelen isteklerde sınırlama yok


const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika engelleme süresi 
    max: (req, res) => {
        console.log("api url", req.url);
        console.log("api ip", req.ip);
        if(req.url === "/login" || req.url === "/register") return 5 // bu endpointlere gelen isteği 5 ile sınırla
        else return 10
    },
    message: {
        success: false,
        message: "Çok fazla istekte bulundunuz!"
    },
    //skip:(req, res) => allowList.includes(req.ip),
    standardHeaders: true,
	legacyHeaders: false
})

module.exports = apiLimiter