import { v2 as cloudinary } from 'cloudinary'

const register = async (req, res, next) => {
    try {
        // const { name, username, password, avatar } = req.body
        console.log("req.body : ", req.body)
        let avatar = {}
        if(req.file){
            avatar = req.file
        }
        
       
        return res.status(200).json({
            message: "success"
        })

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

export { login, register }