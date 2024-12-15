import express from 'express'
import { login, register } from '../controller/user.js'
import { singleAvatar } from '../middleware/multer.js'

const Userroute = express.Router()

Userroute.route('/user').get(login)
Userroute.route('/register').post(register)


export default Userroute