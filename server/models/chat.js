import { Schema, Types, model, models } from 'mongoose'

const ChatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    groupchat: {
        type: Boolean,
        default: false
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    },
    members: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
},
    { timestamps: true }
)

export default ChatSchema = models.ChatSchema || model('Chat', ChatSchema)