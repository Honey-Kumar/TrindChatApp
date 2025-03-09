import mongoose from "mongoose";

const chatRequestSchema = mongoose.Schema({
    request_from_user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    request_to_user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['accepted', 'rejected', 'pending'],
        default: 'pending'
    }
}, { timestamps: true }
)

const chatRequest = mongoose.model('chat_request', chatRequestSchema)
export default chatRequest