import dotenv from 'dotenv'
dotenv.config({
    path: "./config/.env"
})

const Port = process.env.Port
const DBUrl = process.env.DBURL
const Cloudinarycloudname = process.env.Cloudinarycloudname
const Cloudinaryapikey = process.env.Cloudinaryapikey
const Cloudinaryapisecret = process.env.Cloudinaryapisecret
const JWTKey = process.env.JWTkey
const SMPT_HOST = process.env.SMPT_SERVICE
const SMPT_MAIL = process.env.SMPT_MAIL
const SMPT_PASSWORD = process.env.SMPT_PASSWORD
const LOGO = process.env.LOGO
const FrontendOrigin = process.env.FrontendOrigin
const NODE_ENV = process.env.NODE_ENV

export { Port, DBUrl, Cloudinaryapikey, Cloudinaryapisecret, Cloudinarycloudname, JWTKey, SMPT_HOST, SMPT_MAIL, SMPT_PASSWORD, LOGO, FrontendOrigin, NODE_ENV }