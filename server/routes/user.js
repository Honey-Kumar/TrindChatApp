import express from 'express'
import { login } from '../controller/user.js'

const Userroute = express.Router()

Userroute.route('/user').get(login)


export default Userroute