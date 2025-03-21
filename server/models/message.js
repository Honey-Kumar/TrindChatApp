import { Schema, Types, model, models } from 'mongoose'

const MessageSchema = new Schema({
    content: String,
    attachments: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    sender: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    chat: {
        type: Types.ObjectId,
        ref: "Chat",
        required: true,
    },
},
    {
        timestamps: true,
    }
)

export default MessageSchema = models.MessageSchema || model('Message', MessageSchema)