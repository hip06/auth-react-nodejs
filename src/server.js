import express from "express";
import cors from 'cors'
require('dotenv').config()
import { initWebRouter } from './routes/webRoutes'
import { loggerConnectionStatus } from './config/connectDatabase'

// init instance express
let app = express()
// allow url react
let corsOptions = {
    origin: process.env.URL_REACT_APP
}
app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// init routes
initWebRouter(app)
// connect database
loggerConnectionStatus()

let PORT = process.env.PORT || 8668
app.listen(PORT, () => console.log(`App is running on the PORT: ${PORT}`))