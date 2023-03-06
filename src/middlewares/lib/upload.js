const multer = require("multer")
const fs = require("fs")
const path = require("path")

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["images/jpg", "image/gif", "image/jpeg", "image/png"]

    if(!allowedMimeTypes.includes(file.mimetype)) {
        cb(new Error("Bu resim tipi desteklenmemektedir. Lütfen farklı bir seçim seçiniz !"), false)
    }
    cb(null, true)
}

const storage = multer.diskStorage({
    
    destination: function(req, file, cb) {
        const rootDir = path.dirname(require.main.filename)
        console.log("require.main.filename: ", require.main.filename );
        fs.mkdirSync(path.join(rootDir, "/public/uploads"), {recursive: true}) // dosya yolu var mı yok mu check etme
        cb(null, path.join(rootDir, "/public/uploads")) // dosyayı yükleme
    },
    filename: function(req, file, cb) {
        const extension = file.mimetype.split("/")[1]

        if(!req.savedImages) req.savedImages = []
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        let url = `image_${uniqueSuffix}.${extension}`

        req.savedImages = [...req.savedImages, path.join(url)] // savedImages = savedImages+url gibi
        cb(null, url)
    }
})


const upload = multer({storage, fileFilter}).array("images") // or .singl3

module.exports = upload