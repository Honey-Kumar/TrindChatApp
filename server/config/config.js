import dotenv from 'dotenv'
dotenv.config({
    path : "./config/.env"
})

const Port = process.env.Port

export {Port}