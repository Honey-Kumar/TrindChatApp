import { v2 as cloudinary } from 'cloudinary'
import { comparePassword, Email_format, generateUsername, sendEmail, sendToken, uploadFilesToCloudinary } from '../../utils/feature.js'
import User from "../../models/user.js"
import { Errorhandler } from '../../utils/error.js'
import { TryCatch } from '../../middleware/errorMiddleware.js'
import { FrontendOrigin } from '../../config/config.js'
import crypto from "crypto"
import chatRequest from '../../models/chatRequest.js'
import mongoose from 'mongoose'

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
        return next(new Errorhandler('Please enter valid credentials', 400));
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

const forgetPassword = TryCatch(async (req, res, next) => {
    const { email } = req.body
    console.log("email : ", email)
    const userdata = await User.findOne({ email })
    console.log("userdata : ", userdata)
    if (!userdata) {
        return next(new Errorhandler('User not found', 403))
    }

    const token = await userdata.resetToken()
    console.log("token : ", token)

    const mail_format = await Email_format({
        name: userdata.name,
        message: `
        Welcome to Trinder Chat App ${userdata.name}<br/>
        We got your request for password change . Please verify your request : <br/>
        Email : <a href="mailto:${email}" >${email}</a><br/><br/>
        Click on below button to verify your request to reset your password <br/><br/>
        <center><a href='${FrontendOrigin}/resetpassword/${token}'>
       <button style="padding: 1rem 2rem; border-radius: 50px; border: 2px solid #1F55B3; color: white; background-color: #1F55B3; font-size: 1rem; font-weight: 600; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease;">
          Verify Token
        </button>
        </a></center><br/><br/>
        Enjoy Chatting !
        `,
        disclaimer: `
        If you did not request a password reset, please ignore this email.<br/><br/>
        Feal free to contact at Trinder Support in case of any matter.
        `
    })

    const result = await sendEmail({
        email: userdata.email,
        subject: `Trinder Chat App Account Password change request`,
        html: mail_format
    })

    console.log('mail sent : ', result)

    return res.status(200).json({
        message: "Password changed request sent successfully",
        code: 200
    })

})

const resetPassword = TryCatch(async (req, res, next) => {
    const { token, password, confirm_password } = req.body
    const currentDate = new Date()
    const hashtoken = crypto.createHash('sha256').update(token).digest("hex");
    const userdata = await User.findOne({ reset_token: hashtoken, reset_token_expiry: { $gt: new Date() } }).select('+password')
    console.log("userdata : ", userdata)
    if (!userdata) {
        return next(new Errorhandler('User not found', 403))
    }

    if (password.toString() !== confirm_password.toString()) {
        return next(new Errorhandler('Password does not match', 403))
    }

    if (userdata?.reset_token_expiry < currentDate) {
        return next(new Errorhandler('Reset token has been expired', 403))
    }

    userdata.password = password
    userdata.reset_token = ""
    userdata.reset_token_expiry = currentDate
    await userdata.save()

    return res.status(200).json({
        message: "Password has been changed successfully",
        code: 200
    })
})


const getAllUsers = TryCatch(async (req, res, next) => {
    const { offset = 0, limit = 10, search } = req.query
    let filter = {}
    if (search) {
        filter['$or'] = [
            {
                name: { $regex: search, $options: "i" }
            },
            {
                email: { $regex: search, $options: "i" }
            }
        ]
    }
    const userdata = await User.aggregate(
        [
            {
                $match: filter
            },
            {
                $lookup: {
                    from: "chat_requests",
                    localField: "_id",
                    foreignField: "request_to_user",
                    as: "request"
                }
            },
            {
                $unwind: {
                    path: '$request',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    avatar: 1,
                    name: 1,
                    request: {
                        status: 1
                    }
                }
            },
            {
                $sort: {
                    name: 1
                }
            },
            {
                $skip: Number(offset)
            },
            {
                $limit: Number(limit)
            }
        ]
    )
    // console.log("userdata : ", userdata)
    // if (!userdata || userdata.length === 0) {
    //     return next(new Errorhandler('User not found', 403))
    // }

    return res.status(200).json({
        message: "User data fetched successfully",
        data: userdata,
        code: 200
    })

})

const sendChatRequest = TryCatch(async (req, res, next) => {
    const { user_id } = req.body
    const myid = req.user
    console.log("myid : ", myid)
    const isExisted = await chatRequest.findOne({
        request_from_user: myid,
        request_to_user: user_id
    })
    console.log(isExisted)
    const newchatrequest = await chatRequest.create({
        request_from_user: myid,
        request_to_user: user_id
    })
    console.log("newchatrequest : ", newchatrequest)
    return res.status(200).json({
        message: "chat request sent successfully",
        data: newchatrequest,
        code: 200
    })
})

const getChatRequest = TryCatch(async (req, res, next) => {
    const myid = req.user
    console.log("myid : ", myid)
    const chatrequestdata = await chatRequest.aggregate(
        [
            {
                $match: {
                    request_to_user: new mongoose.Types.ObjectId(myid),
                    status: { $ne: "accepted" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "request_from_user",
                    foreignField: "_id",
                    as: "request_user_data",
                    pipeline: [
                        {
                            $project: {
                                name: 1,
                                avatar: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$request_user_data"
                }
            }
        ]
    )
    console.log("chatrequestdata : ", chatrequestdata)
    return res.status(200).json({
        message: "chat request fetched successfully",
        data: chatrequestdata,
        code: 200
    })
})

export { login, register, logout, myProfile, editProfile, deleteProfile, forgetPassword, resetPassword, getAllUsers, sendChatRequest, getChatRequest }