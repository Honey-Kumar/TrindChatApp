import { v2 as cloudinary } from 'cloudinary'
import { comparePassword, Email_format, generateUsername, sendEmail, sendToken, uploadFilesToCloudinary } from '../../utils/feature.js'
import User from "../../models/user.js"
import { Errorhandler } from '../../utils/error.js'
import { TryCatch } from '../../middleware/errorMiddleware.js'

async function generateOtp() {
    return await Math.floor(Math.random() * 1000000)
}

const register = TryCatch(async (req, res, next) => {
    console.log("req.body : ", req.body)
    let avatar = {}

    if (req.file) {
        const result = await uploadFilesToCloudinary([req.file])
        avatar.public_id = result[0].public_id
        avatar.url = result[0].url
    }

    const getusername = await generateUsername(req.body.name)
    const newuser = await User.create({
        name: req.body.name,
        username: getusername,
        email: req.body.email,
        password: req.body.password,
        avatar
    })

    const myotp = await generateOtp()
    newuser.otp = myotp
    newuser.otp_expiry
    await newuser.save()

    const mail_format = await Email_format({
        name: newuser.name,
        message: `
        Welcome to Trinder Chat App ${newuser.name}<br/>
        Your Account with Trinder is successfully created with Credentials :<br/>
        Email : <a href="mailto:${newuser.email}" >${newuser.email}</a><br/>
        Username : ${newuser.username}<br/><br/>
        <center><strong>Your OTP to verify email </strong></center><br/>
        <center><strong>${myotp}</strong></center><br/>
        Enjoy Chatting !
        `,
        disclaimer: `
        Feal free to contact at Trinder Support in case of any matter.
        `
    })

    const result = await sendEmail({
        email: newuser.email,
        subject: `Trinder Chat App Account Creation Email`,
        html: mail_format
    })

    console.log('mail sent : ', result)

    sendToken(newuser, req, res, next, "Profile created successfully", 200)
})

const login = TryCatch(async (req, res, next) => {
    const { credentials, password } = req.body
    if (!credentials || !password) {
        return next(new Errorhandler('Please valid credentials', 400));
    }

    const userData = await User.findOne({
        $or: [{ email: credentials }, { username: credentials }]
    }).select('+password')

    console.log('userData : ', userData, userData?.password);

    if (!userData) {
        return next(new Errorhandler('User not found', 400))
    }

    const confirmPassword = await comparePassword(password, userData?.password)
    console.log('confirmPassword :', confirmPassword)

    if (!confirmPassword) {
        return next(new Errorhandler('Invalid credentials', 403))
    }

    if (!userData) {
        return next(new Errorhandler('Invalid credentials', 403))
    }

    sendToken(userData, req, res, next, "Log in successfully", 200)
})

const logout = TryCatch(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    return res.status(200).json({
        message: "Logout successfully",
        code: 200
    })
})

const myProfile = TryCatch(async (req, res, next) => {
    const id = req.user
    console.log('id : ', id)

    const data = await User.findOne({ _id: id })
    if (!data) {
        return next(new Errorhandler('User not found', 403))
    }

    return res.status(200).json({
        message: "Profile details fetched successfully",
        data,
        code: 200
    })
})

const editProfile = TryCatch(async (req, res, next) => {
    const data = req.body
    const id = req.user

    const response = await User.findById({ _id: id })
    if (!response) {
        return next(new Errorhandler('User not found', 400))
    }
    const result = await User.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
    console.log('result : ', result)

    return res.status(200).json({
        message: 'Profile edited successfully',
        data: result,
        code: 200
    })

})

const deleteProfile = TryCatch(async (req, res, next) => {
    const id = req.user
    const userData = await User.findById({ _id: id });
    if (!userData) {
        return next(new Errorhandler('User not found', 400))
    }
    const destroyImage = await cloudinary.v2.uploader.destroy(userData.avatar.public_id)
    console.log('destroy image : ', destroyImage)
    const result = await User.deleteOne({ _id: id })
    console.log('result : ', result)
    return res.status(200).json({
        message: "Profile deleted successfully",
        code: 200
    })
})

export { login, register, logout, myProfile, editProfile, deleteProfile }