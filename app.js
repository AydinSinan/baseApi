require("express-async-errors") // ilk satırda olmalı! API patlamadı bu sayede!
const express = require("express")
const app = express()
require("dotenv").config() // .env dosyasına erişim için
require("./src/db/dbConnection")
const router = require("./src/routes") // middleware'in üzerinde bulunmalı!
const errorHandlerMiddleware = require("./src/middlewares/errorHandler")
const PORT = process.env.PORT || 5001;


// Middlewares
app.use(express.json()) // post içerisindeki req.body okuyabilmek için
app.use(express.urlencoded({extended: true}))


app.use("/api", router)  // yönlendirmeler middleware'in altında

app.get("/", (req, res) => {
    res.json({
        message: "Hoş Geldiniz"
    })
})

// Error Handler
app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
    console.log(`Server ${PORT} porundan çalışıyor...`)
})