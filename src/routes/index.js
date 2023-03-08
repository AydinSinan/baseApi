const router = require("express").Router()
const multer = require("multer")
const upload = require("../middlewares/lib/upload")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
const auth = require("./auth.routes")

router.use(auth)

router.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if(err instanceof multer.MulterError)
            throw new APIError("Resim yüklenirken multer kaynaklı hata oluştu.", err)
        else if(err)
            throw new APIError("Resim yüklenirken hata oluştu.", err)
        else return new Response(req.savedImages, "Yükleme başarıyla gerçekleşti").success(res)
    })
})

module.exports = router