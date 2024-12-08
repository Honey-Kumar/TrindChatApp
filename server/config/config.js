import dotenv from 'dotenv'
dotenv.config({
    path: "./config/.env"
})

const Port = process.env.Port
const DBUrl = process.env.DBURL
const Cloudinarycloudname = process.env.Cloudinarycloudname
const Cloudinaryapikey = process.env.Cloudinaryapikey
const Cloudinaryapisecret = process.env.Cloudinaryapisecret

export { Port, DBUrl, Cloudinaryapikey, Cloudinaryapisecret, Cloudinarycloudname }