import mongoose, { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    dob: {
        type: String
    },
    phone_number: {
        type: Number,
        min: 10
    },
    otp: {
        type: Number
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    otp_expiry: {
        type: Date,
        default: () => new Date(Date.now() + (5 * 60 * 60 * 1000))
    },
    phone_otp: {
        type: Number
    },
    is_phone_verified: {
        type: Boolean,
        default: false
    },
    phone_otp_expiry: {
        type: Date,
        default: () => new Date(Date.now() + (5 * 60 * 60 * 1000))
    }
},
    { timestamps: true }
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
})

// UserSchema.methods.comparePassword = async function (password) {
//     try {
//         const result = await bcrypt.compare(password, this.password)
//         return result
//     } catch (error) {
//         throw new Error('Password does not match')
//     }
// }


const User = mongoose.models.User || model('User', UserSchema);

export default User;