const cookieParser = require("cookie-parser")
const express = require("express")

const app = express()

const errorMiddleware = require("./middlewares/error")

//express middlewares 
app.use(express.json())
app.use(cookieParser())

const user = require("./routes/userRoute")
app.use('/api/v1',user)
app.use(errorMiddleware)

module.exports = app

