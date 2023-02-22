const mongoose = require("mongoose")

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
})
.then(() => {
    console.log("Connected Successfully")
})
.catch((err) => {
    console.log("Connection failed", err)
})
