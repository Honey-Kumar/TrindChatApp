import express from 'express'
import { Cloudinaryapikey, Cloudinaryapisecret, Cloudinarycloudname, FrontendOrigin, JWTKey, Port } from './config/config.js'
import Userroute from './routes/user.js'
import ConnectDB from './database/index.js'
import cloudinary from 'cloudinary'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/errorMiddleware.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser(JWTKey))
app.use(cors({
    origin: `${FrontendOrigin}`,
    credentials: true
}))
app.use(Userroute)

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Trinder Chat App'
    })
})

app.use(errorMiddleware)
ConnectDB()

//configure cloudinary
cloudinary.config({
    cloud_name: Cloudinarycloudname,
    api_key: Cloudinaryapikey,
    api_secret: Cloudinaryapisecret
})


app.listen(Port, () => {
    console.log(`Trinder chat app is running on server port : ${Port}`)
})