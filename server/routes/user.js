import express from 'express'
import { deleteProfile, editProfile, login, logout, myProfile, register } from '../controller/user/user.js'
import { singleAvatar } from '../middleware/multer.js'
import { authenticate } from '../utils/feature.js'

const Userroute = express.Router()

Userroute.route('/login').post(login)
Userroute.route('/register').post(singleAvatar, register)
Userroute.route('/logout').post(authenticate, logout)
Userroute.route('/me').get(authenticate, myProfile)
Userroute.route('/editProfile').patch(authenticate, editProfile)
Userroute.route('/deleteProfile').delete(authenticate, deleteProfile)

export default Userroute