const login = async(req,res)=>{
    res.status(200).json({
        success : true,
        message : 'Welcome to Trinder Chat App'
    })
}

export {login}