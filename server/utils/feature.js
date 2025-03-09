import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuid } from "uuid";
import { getBase64 } from '../lib/helper.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Errorhandler } from "./error.js"
import { JWTKey, LOGO, NODE_ENV, SMPT_HOST, SMPT_MAIL, SMPT_PASSWORD } from "../config/config.js"
import { TryCatch } from '../middleware/errorMiddleware.js';
import nodemailer from "nodemailer"

const uploadFilesToCloudinary = async (files = []) => {
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                getBase64(file),
                {
                    resource_type: "auto",
                    public_id: uuid(),
                    folder: 'ChatApp User',
                    width: 150,
                    srop: 'scale'
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
        });
    });

    try {
        const results = await Promise.all(uploadPromises);

        const formattedResults = results.map((result) => ({
            public_id: result.public_id,
            url: result.secure_url,
        }));
        return formattedResults;
    } catch (err) {
        throw new Error("Error uploading files to cloudinary", err);
    }
};


const sendToken = async (user, req, res, next, message, code) => {
    try {
        const token = await jwt.sign({ id: user._id }, JWTKey, { expiresIn: '1d' })
        console.log(token)

        const isProduction = NODE_ENV === 'production';
        return res.status(code).cookie('token', token,
            {
                httpOnly: true,
                sameSite: 'lax',
                // signed: true,
                secure: isProduction,
                maxAge: 24 * 60 * 60 * 1000,
            }
        ).json({
            success: true,
            data: user,
            token,
            message
        })
    } catch (error) {
        return next(new Errorhandler(error, 500))
    }
}

const generateUsername = async (name) => {
    try {
        const token = await Math.floor(Math.random() * 10000)
        return `${name}@${token}`
    } catch (error) {
        return next(error)
    }
}


const Email_format = async (data) => {
    return ` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; }
            .header { background: #007bff; color: #ffffff; padding: 10px 0; text-align: center; border-radius: 8px 8px 0 0; }
            .content { margin: 20px 0; }
            .footer { text-align: center; margin: 20px 0; font-size: 14px; color: #888888; }
            a { color: #007bff; text-decoration: none; }
            a:hover { text-decoration: underline; }
            #img { width: 10rem; height: 10rem; display: block; margin: 0 auto; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Trinder Chat App</h1>
                <div style="width : 100%; height : 100%">
                 <img src="${LOGO}" alt="Logo" id="img"/>
                </div>
            </div>
            <div class="content">
                <p>Hello ${data.name},</p>
                <p>${data.message}</p>
                <p>${data.disclaimer}</p>
                <p>Regards,</p>
                <p><strong>Trinder Chat App</strong></p>
                <p>A Platform connecting our loved ones</p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Trinder Chat App. All rights reserved.
            </div>
        </div>
    </body>
    </html>`
}


const sendEmail = async (options) => {
    try {
        const transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            service: SMPT_HOST,
            auth: {
                user: SMPT_MAIL,
                pass: SMPT_PASSWORD,
            },
        })

        const mailoptions = {
            from: SMPT_MAIL,
            to: options.email,
            subject: options.subject,
            html: options.html,
        }

        await transporter.sendMail(mailoptions)
    } catch (error) {
        throw new Error(error)
    }
}

const authenticate = async (req, res, next) => {
    try {
        // const token = (req.signedCookies.token || req.cookies.token) || (req.signedCookies.authtoken || req.cookies.authtoken)
        console.log("All cookies:", req.cookies);
        const token = req.cookies.token
        console.log('backend-token : ', token)

        if (!token) {
            return next(new Errorhandler('Please login to access Trinder Chat app', 400))
        }
        const decoded_data = jwt.verify(token, JWTKey);
        console.log('decoded data : ', decoded_data);

        req.user = decoded_data.id;
        next();
    } catch (error) {
        return next(new Errorhandler(error, 401));
    }
}

const comparePassword = async function (password, comparePassword) {
    try {
        const result = await bcrypt.compare(password, comparePassword)
        return result
    } catch (error) {
        throw new Error('Password does not match')
    }
}

export { uploadFilesToCloudinary, sendToken, generateUsername, sendEmail, Email_format, authenticate, comparePassword }
