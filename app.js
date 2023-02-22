const express = require("express")
const app = express()
require("dotenv").config() // .env dosyasına erişim için
require("./src/db/dbConnection")

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.json({
        message: "Hoş Geldiniz"
    })
})

app.listen(PORT, () => {
    console.log(`Server ${PORT} porundan çalışıyor...`)
})