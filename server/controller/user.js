import {v2 as cloudinary} from 'cloudinary'
const register = async (req, res, next) => {
    try {
        const { name, username, password, avatar } = req.body
        
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Trinder Chat App'
    })
}

export { login }