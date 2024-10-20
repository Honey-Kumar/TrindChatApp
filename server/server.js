import express from 'express'
import { Port } from './config/config.js'
import Userroute from './routes/user.js'

const app = express()

app.use(Userroute)

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Trinder Chat App'
    })
})

app.listen(Port, () => {
    console.log(`Trinder chat app is running on server port : ${Port}`)
})