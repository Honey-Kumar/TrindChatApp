import express from 'express'
import { Cloudinaryapikey, Cloudinaryapisecret, Cloudinarycloudname, Port } from './config/config.js'
import Userroute from './routes/user.js'
import ConnectDB from './database/index.js'
import cloudinary from 'cloudinary'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors({
    origin: '*'
}))
app.use(cookieParser())
app.use(Userroute)

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Trinder Chat App'
    })
})

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