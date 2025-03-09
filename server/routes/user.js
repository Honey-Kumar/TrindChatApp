import express from 'express'
import { deleteProfile, editProfile, forgetPassword, getAllUsers, getChatRequest, login, logout, myProfile, register, resetPassword, sendChatRequest } from '../controller/user/user.js'
import { singleAvatar } from '../middleware/multer.js'
import { authenticate } from '../utils/feature.js'

const Userroute = express.Router()

Userroute.route('/login').post(login)
Userroute.route('/register').post(singleAvatar, register)
Userroute.route('/logout').post(authenticate, logout)
Userroute.route('/me').get(authenticate, myProfile)
Userroute.route('/editProfile').patch(authenticate, editProfile)
Userroute.route('/deleteProfile').delete(authenticate, deleteProfile)
Userroute.route('/forgetPassword').post(forgetPassword)
Userroute.route('/resetPassword').post(resetPassword)
Userroute.route('/getUsers').get(authenticate, getAllUsers)
Userroute.route('/sendChatRequest').post(authenticate, sendChatRequest)
Userroute.route('/getchatrequest').get(authenticate, getChatRequest)

export default Userroute